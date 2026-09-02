# Reservation Route Discovery

The official Bazino site at `https://bazino.pro/` exposes a visible navigation button labeled `رزرو` and a booking CTA labeled `همین حالا رزرو کن`. Selecting the `رزرو` navigation item did not change the browser URL; it remained `https://bazino.pro/`, indicating an in-place single-page reservation view rather than a distinct path visible in the browser address bar.

The local Bazino portal data model uses the canonical page id `reservations`. The exact external reservation destination should therefore be confirmed from the official site’s client-side navigation before wiring the Hero CTA; a homepage link alone would not meet the user’s request if a deep link exists.
