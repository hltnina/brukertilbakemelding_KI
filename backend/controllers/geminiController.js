import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateWithGemini(req, res) {
    try {
        const description = req.body.description;
        const title = req.body.title || ''
        const files = req.files || [];


        if (!description) {
            return res.status(400).json({
                error: "Description is required",
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });


        // bygg filkontekst-setning til prompten

        let fileContextLine = '';
        const imageFiles = files.filter(f => f?.mimetype?.startsWith("image/"));
        const pdfFiles = files.filter(f => f?.mimetype === "application/pdf");
        const hasVideo = files.some(f => f?.mimetype?.startsWith("video/"));

        if (imageFiles.length > 0 && pdfFiles.length > 0) {
            fileContextLine = `Brukeren har vedlagt ${imageFiles.length} bilde(r) og ${pdfFiles.length} PDF-dokument(er). Analyser disse sammen med beskrivelsen nedenfor.`;
        } else if (imageFiles.length > 0) {
            fileContextLine = `Brukeren har vedlagt ${imageFiles.length} bilde(r). Analyser det/de vedlagte bildet/bildene konkret — beskriv hva du faktisk ser i bildet som er relevant for tilgjengelighetsproblemet.`;
        } else if (pdfFiles.length > 0) {
            fileContextLine = `Brukeren har vedlagt ${pdfFiles.length} PDF-dokument(er). Analyser innholdet i dokumentet(ene) konkret.`;
        }


        let prompt = `
    Du er en ekspert på universell utforming og WCAG-standarder.

Analyser følgende tilgjengelighetsproblem og returner en strukturert rapport.

Svar UTEN markdown-formatering. Ikke bruk ###, **, *, eller andre markdown-tegn.

${!title || title.trim() === ''
            ? 'TITTEL: Generer en kort og presis tittel (maks 8 ord) som beskriver problemet.\n'
            : `TITTEL: ${title}\n`
    }


    ${fileContextLine ? fileContextLine + '\n' : ''}

BESKRIVELSE FRA BRUKER:
${description}


Gi en strukturert analyse med følgende seksjoner:

 1. Klassifisering
- Tema: (f.eks. Tastaturnavigasjon, Fargekontrast, Skjermleser, Skjemaelementer, osv.)
- WCAG-nivå: A / AA / AAA
- Relevant WCAG-kriterium: (f.eks. 1.4.3 Kontrast (minimum) – nivå AA)

2. Rotårsak
Forklar den underliggende tekniske eller designmessige årsaken til problemet. Vær konkret.
${imageFiles.length > 0 ? 'VIKTIG: Når du beskriver funn fra det/de vedlagte bildet/bildene, angi eksplisitt at observasjonen er basert på det bildet (f.eks "I det vedlagte skjermbildet ser jeg..." eller "Bildet viser..."). Dette skiller visuell observasjon fra generell WCAG-kunnskap.'  : ''}
${pdfFiles.length > 0 ? 'VIKTIG: Når du refererer til innhold fra det vedlagte PDF-dokumentet, angi eksplisitt at informasjonen er hentet fra dokumentet (f.eks "ifølge det vedlagte dokumentet..." eller "Rapporten beskriver...."). Dette gjør det tydelig for leseren hvilken informasjon som kommer fra brukerens eget kildemateriale kontra generell WCAG-kunnskap.' : ''}


3. Konsekvens for bruker
Beskriv hvem som rammes og hvordan (f.eks. blinde brukere, motorisk nedsatte, eldre).

4. Prioriterte utbedringer
List opp 2–4 konkrete tiltak i prioritert rekkefølge:
1. [Høyest prioritet] Tiltak med beskrivelse
2. ...

5. Verifisering
Beskriv hvordan hvert tiltak kan testes og verifiseres (automatisk test, manuell test, eller brukertest).
  `;



        // bygg innholdsdeler til Gemini

        const contentParts = [{ text: prompt }];

        for (const file of imageFiles) {
            contentParts.push({
                inlineData: {
                    mimeType: file.mimetype,
                    data: file.buffer.toString("base64"),
                },
            });
        }

        for (const file of pdfFiles) {
            contentParts.push({
                inlineData: {
                    mimeType: "application/pdf",
                    data: file.buffer.toString("base64"),
                },
            });
        }
        

        const result = await model.generateContent(contentParts);
        const message =
            result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";


        const titleMatch = message.match(/TITTEL[:\s]*([^\n]+)/i)
        const generatedTitle = titleMatch ? titleMatch[1].trim() : null


        //fjern tittel-linje fra KI analysen
        const cleanedMessage = message
            .replace(/TITTEL[^\n]*\n?/i, '')
            .replace(/^---\s*\n/m, '')
            .trim()
           
            
        console.log("=== KI SVAR ===")
        console.log(message)                
        console.log("=== WCAG MATCH ===")


        // wcag nivå fra KI svar
        const wcagMatch = message.match(/WCAG-nivå[:\s*]*\**(AAA|AA|A)\**/i)
        const wcagLevel = wcagMatch ? wcagMatch[1].toUpperCase() : null


        // Map til GitHub label-navn
        const wcagLabel = wcagLevel ? `WCAG-${wcagLevel}` : null



        return res.json({
            success: true,
            message: cleanedMessage,
            generatedTitle,
            wcagLevel, // f.eks AA
            wcagLabel, // f.eks WCAG-AA
            note: hasVideo ? "Video er lastet opp, men støttes ikke ennå" : null
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Gemini failed" });
    }
}

    

    
