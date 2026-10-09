// 예전 다잼(apps.seolcoding.com)이 남긴 서비스 워커를 지운다.
// 재방문자의 브라우저가 옛 다잼 화면을 캐시에서 보여 주지 않도록, 캐시를 비우고 스스로 등록을 푼 뒤 화면을 새로 고친다.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((n) => n.startsWith("dajam-")).map((n) => caches.delete(n)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window" });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
