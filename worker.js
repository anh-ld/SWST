import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
	const pathname = new URL(event.request.url).pathname

	if (pathname === '/') {
		const index = await getAssetFromKV(event);
		const indexTemplate = await index.text();

		const { render, renderCss } = (await import('./dist/server/entry-server.js'));
		const appHtml = render('/', {});
		const appCss = renderCss();

		let html = indexTemplate.replace(`<!--app-html-->`, appHtml);
		html = html.replace(`<!--app-css-->`, appCss);

		return new Response(html, {
      headers: { 'content-type': 'text/html' },
    });
	} else {
		return await getAssetFromKV(event);
	}
}