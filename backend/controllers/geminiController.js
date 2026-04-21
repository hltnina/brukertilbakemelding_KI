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
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

        let prompt = `
    Du er en ekspert på universell utforming og WCAG-standarder.

Analyser følgende tilgjengelighetsproblem og returner en strukturert rapport.

Svar UTEN markdown-formatering. Ikke bruk ###, **, *, eller andre markdown-tegn.

${!title || title.trim() === ''
            ? 'TITTEL: Generer en kort og presis tittel (maks 8 ord) som beskriver problemet.\n'
            : 'TITTEL: ${ title }\n'
    }
    

BESKRIVELSE FRA BRUKER:
${description}

Gi en strukturert analyse med følgende seksjoner:

 1. Klassifisering
- Tema: (f.eks. Tastaturnavigasjon, Fargekontrast, Skjermleser, Skjemaelementer, osv.)
- WCAG-nivå: A / AA / AAA
- Relevant WCAG-kriterium: (f.eks. 1.4.3 Kontrast (minimum) – nivå AA)

2. Rotårsak
Forklar den underliggende tekniske eller designmessige årsaken til problemet. Vær konkret.

3. Konsekvens for bruker
Beskriv hvem som rammes og hvordan (f.eks. blinde brukere, motorisk nedsatte, eldre).

4. Prioriterte utbedringer
List opp 2–4 konkrete tiltak i prioritert rekkefølge:
1. [Høyest prioritet] Tiltak med beskrivelse
2. ...

5. Verifisering
Beskriv hvordan hvert tiltak kan testes og verifiseres (automatisk test, manuell test, eller brukertest).
  `;



        let imageParts = [];
        let hasVideo = false;

        for (const file of files) {

            if (file?.mimetype.startsWith("image/")) {
                imageParts.push({
                    inlineData: {
                        mimeType: file.mimetype,
                        data: file.buffer.toString("base64"),
                    },
                });


            }

            if (file.mimetype.startsWith("video/")) {
                hasVideo = true;
            }

        }

        const content = imageParts.length > 0
            ? [{ text: prompt }, ...imageParts]
            : [{ text: prompt }];



        

        const result = await model.generateContent(content);
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

    

    
