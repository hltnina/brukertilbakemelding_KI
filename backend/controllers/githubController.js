import { githubRequest, hasGitHubToken } from "../services/githubService.js";

const GITHUB_OWNER = process.env.GITHUB_OWNER || "hltnina";
const GITHUB_REPO = process.env.GITHUB_REPO || "brukertilbakemelding_KI";

export async function createIssue(req, res) {
  const {
    title,
    body,
    assignees,
    labels,
    owner = GITHUB_OWNER,
    repo = GITHUB_REPO,
  } = req.body || {};

  if (!title) {
    return res.status(400).json({ error: "Missing required field: title" });
  }

  if (!hasGitHubToken()) {
    return res.status(500).json({ error: "Server missing GITHUB_TOKEN" });
  }

  const payload = {
    title,
    body: body || "",
    ...(Array.isArray(assignees) ? { assignees } : {}),
    ...(Array.isArray(labels) ? { labels } : {}),
  };

  const result = await githubRequest(`/repos/${owner}/${repo}/issues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    return res
      .status(result.status)
      .json({ error: "GitHub API error", details: result.data });
  }

  return res.status(201).json(result.data);
}

export async function getRepoIssues(req, res) {
  const { owner, repo } = req.params;

  const result = await githubRequest(
    `/repos/${owner}/${repo}/issues?state=open&per_page=100`,
  );

  if (!result.ok) {
    return res
      .status(result.status)
      .json({ error: "GitHub API error", details: result.data });
  }

  return res.json(result.data);
}

export async function getDefaultRepoIssues(_req, res) {
  const result = await githubRequest(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?state=open&per_page=100`,
  );

  if (!result.ok) {
    return res
      .status(result.status)
      .json({ error: "GitHub API error", details: result.data });
  }

  return res.json(result.data);
}

export async function getUserIssues(req, res) {
  const { username } = req.params;
  const query = encodeURIComponent(`author:${username} type:issue`);

  const result = await githubRequest(`/search/issues?q=${query}&per_page=100`);

  if (!result.ok) {
    return res
      .status(result.status)
      .json({ error: "GitHub API error", details: result.data });
  }

  return res.json(result.data);
}