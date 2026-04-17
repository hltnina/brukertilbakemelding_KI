const USER_AGENT = "brukertilbakemelding-ki-service";

function makeGitHubHeaders() {
  const githubToken = process.env.GITHUB_TOKEN;

  const headers = {
    "User-Agent": USER_AGENT,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  return headers;
}

async function parseGitHubResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { message: text || "No response body" };
}

export async function githubRequest(path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      ...makeGitHubHeaders(),
      ...(options.headers || {}),
    },
  });

  const data = await parseGitHubResponse(response);

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

export function hasGitHubToken() {
  return Boolean(process.env.GITHUB_TOKEN);
}