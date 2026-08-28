import fs from 'fs';

async function main() {
  const htmlRes = await fetch('https://segerman.dev/');
  const html = await htmlRes.text();
  const scriptMatch = html.match(/src="(\/_astro\/[^"]+)"/);
  if (!scriptMatch) {
    console.log("No script match found in HTML");
    return;
  }
  const scriptUrl = 'https://segerman.dev' + scriptMatch[1];
  console.log("Fetching script:", scriptUrl);
  const jsRes = await fetch(scriptUrl);
  const jsText = await jsRes.text();
  fs.writeFileSync('segerman_script.js', jsText);
  console.log("Saved segerman_script.js length:", jsText.length);
}

main().catch(console.error);
