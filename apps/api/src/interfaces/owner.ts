export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
}

export interface GitApiUrlParam {
  owner: string;
  repos: string;
}
