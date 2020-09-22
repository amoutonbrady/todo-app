// source: https://gist.github.com/gordonbrander/2230317#gistcomment-3443509
export function uid() {
  let a = new Uint32Array(3);
  crypto.getRandomValues(a);

  const now = performance.now().toString(36);
  const hash = Array.from(a)
    .map((A) => A.toString(36))
    .join("");

  return (now + hash).replace(/\./g, "");
}
