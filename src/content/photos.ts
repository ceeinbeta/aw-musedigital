import type { ImageAsset } from "@/lib/content/types";

/**
 * Every photograph used on the site, in one place.
 *
 * All are from Unsplash under the Unsplash License (https://unsplash.com/license):
 * free for commercial use, no permission needed. Unsplash+ images, which have
 * a different, paid licence, are deliberately not used. Photographers are
 * credited under large images as a courtesy.
 *
 * To swap a photo, change its ID, page slug and photographer below. When you
 * have your own photography, upload it to Sanity instead.
 *
 * The images are delivered through Next.js image optimisation, so visitors'
 * browsers load them from this site, never directly from Unsplash.
 */

function unsplash(id: string, slug: string, photographer: string, alt: string): ImageAsset {
  return {
    url: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`,
    alt,
    credit: { name: photographer, url: `https://unsplash.com/photos/${slug}`, source: "Unsplash" },
  };
}

export const photos = {
  // Homepage
  outdoorTable: unsplash(
    "1758810741067-c20b49078b10",
    "outdoor-table-setting-with-floral-arrangements-and-lemons-rqz9F0IhoCo",
    "Bruno Ngarukiye",
    "An outdoor table set with flowers and bowls of lemons",
  ),

  // Edit covers
  styleCover: unsplash(
    "1613915617430-8ab0fd7c6baf",
    "person-in-blazer-and-trousers-HlVjI5WmoQY",
    "Chyntia Juls",
    "A person in a tailored blazer and trousers",
  ),
  livingCover: unsplash(
    "1633000117256-f8d7e244ca70",
    "a-white-vase-filled-with-white-flowers-on-top-of-a-table-PsY9OJuBrdQ",
    "Kasia Sikorska",
    "A white vase of white flowers in a calm, neutral room",
  ),
  eventCover: unsplash(
    "1536392706976-e486e2ba97af",
    "long-dining-table-with-festive-flowers-fb0_wj2MZk4",
    "M F",
    "A long dining table decorated with flowers for a celebration",
  ),
  businessCover: unsplash(
    "1613252036716-e1efc9788e5b",
    "white-wooden-desk-with-gray-chair-O1dDKmhedWc",
    "SANDRA REI",
    "A white desk and grey chair in a calm, light workspace",
  ),

  // The Living Edit
  coffeeTable: unsplash(
    "1750639258774-9a714379a093",
    "elegant-living-room-with-neutral-colors-and-art-z6Yn9hhlrJw",
    "Rebecca Chandler",
    "A neutral living room with a stone coffee table styled with books, a bowl and a vase",
  ),
  coffeeTableDetail: unsplash(
    "1759722668767-3f9cb7468b7b",
    "a-comfortable-sofa-with-throw-pillows-and-blanket-lyM5gL4esIw",
    "Costa Live",
    "A pale sofa with cushions and a throw beside a low wooden coffee table",
  ),
  smallLivingRoom: unsplash(
    "1631679706909-1844bbd07221",
    "a-living-room-filled-with-furniture-and-a-mirror-c0JoR_-2x3E",
    "Spacejoy",
    "A small, bright living room with a pale sofa, round mirrors and a rug",
  ),
  smallLivingRoomDetail: unsplash(
    "1781249144459-0a9ce5bbf77d",
    "cozy-modern-living-space-with-sofa-armchair-and-natural-light-5wMfBJqSqIg",
    "Irena Oze",
    "A compact living space with a sofa and armchair in natural light",
  ),
  bedLinen: unsplash(
    "1617325247661-675ab4b64ae2",
    "white-bed-pillow-on-brown-wooden-bed-frame-gVKmonDbotU",
    "Deconovo",
    "A low wooden bed made with white and grey linen bedding",
  ),
  linenTexture: unsplash(
    "1614226114676-8e02ac5f4763",
    "white-textile-in-close-up-photography-BDJy8J3R4GY",
    "Jacinta Christos",
    "Close-up of white woven fabric",
  ),

  // The Style Edit
  capsuleWardrobe: unsplash(
    "1603400521630-9f2de124b33b",
    "clothing-racks-with-neutral-toned-garments-mwa_nzFpnJw",
    "Thom Bradley",
    "A clothing rail of neutral-toned garments",
  ),
  clothesRail: unsplash(
    "1558769132-cb1aea458c5e",
    "hanged-top-on-brown-and-white-clothes-horse-TS--uNw-JqE",
    "Alyssa Strohmann",
    "A top hanging on a simple wooden clothes rail",
  ),
  linenShirt: unsplash(
    "1713881587420-113c1c43e28a",
    "a-white-shirt-hanging-on-a-clothes-line-S4f4apZd-hA",
    "tian dayong",
    "A white shirt drying on a clothes line",
  ),
  linenFabric: unsplash(
    "1596433904500-97b901c5d274",
    "white-textile-on-brown-wooden-table-HbiRi1Owk9k",
    "Svitlana",
    "Folded white linen on a wooden table",
  ),
  summerDress: unsplash(
    "1789110520302-3df8ce0410f0",
    "person-in-white-linen-dress-qSA-x_pTHqQ",
    "engin akyurt",
    "A person wearing a loose white linen dress",
  ),

  // The Event Edit
  placeSetting: unsplash(
    "1630527152680-500b5453fb04",
    "white-ceramic-plate-beside-stainless-steel-fork-and-bread-knife-on-white-table-yLfsEMVbOWA",
    "Karen Sewell",
    "A simple place setting with a white plate, fork and bread knife",
  ),
  dinnerParty: unsplash(
    "1528605248644-14dd04022da1",
    "people-sitting-in-front-of-table-talking-and-eating-W3SEyZODn8U",
    "Priscilla Du Preez",
    "Friends talking and eating around a dinner table",
  ),
  centrepiece: unsplash(
    "1769812343316-c5b123243f0b",
    "elegant-table-setting-with-white-flowers-and-candles-5e0QQ92_y7E",
    "Jonathan Borba",
    "A dinner table set with low white flowers and candles",
  ),
  candlesRoses: unsplash(
    "1602693875034-52c6b2e79785",
    "white-candles-on-brown-wooden-table-cY1mJX_N7Xc",
    "Sixteen Miles Out",
    "Lit white pillar candles and greenery on a wooden table",
  ),
  elegantTable: unsplash(
    "1780337092627-341f99bf2bc5",
    "elegant-dining-table-set-with-flowers-glasses-and-plates-Pm2SW5H9pWM",
    "Jonathan Borba",
    "An elegant dining table set with flowers, glasses and plates",
  ),

  // The Business Edit
  notebook: unsplash(
    "1611079830811-865ff4428d17",
    "white-notebook-with-pen-on-top-1ixT36dfuSQ",
    "Diana Polekhina",
    "An open white notebook with a pen",
  ),
  laptopMug: unsplash(
    "1615107899082-044cc1133649",
    "white-ceramic-mug-beside-macbook-pro-Iz_dQ_t_9HE",
    "sonia jahandari",
    "A white mug beside a laptop on a desk",
  ),
  productStillLife: unsplash(
    "1693407838881-9c3f17c6ac59",
    "a-camera-pencils-a-camera-lens-and-other-items-on-a-table-LE4f5I4okdM",
    "Andrea Riezzo",
    "A camera, lens and pencils arranged on a table",
  ),
  productFlatLay: unsplash(
    "1634576950927-6a8ed02ea38e",
    "a-white-table-topped-with-cosmetics-and-a-necklace-YsKms3GnATg",
    "Arteida MjESHTRI",
    "Cosmetics and a necklace arranged on a white table",
  ),
  websiteDesk: unsplash(
    "1752224543110-35faed040b91",
    "a-cozy-desk-with-plants-and-a-laptop-rcJcJ9urV7c",
    "Dhony Koswara",
    "A light desk with a laptop, books and plants",
  ),
  websiteWorkspace: unsplash(
    "1718524767521-1aec8589115b",
    "a-room-with-a-chair-desk-and-a-lamp-dJPEEXJq3ac",
    "Urban Vintage",
    "A wooden desk with a lamp and chair in a calm room",
  ),

  // About
  aboutDesk: unsplash(
    "1612367980327-7454a7276aa7",
    "white-spiral-notebook-on-brown-wooden-table-2q_frVRXWfQ",
    "Kelly Sikkema",
    "A spiral notebook on a wooden table",
  ),
} satisfies Record<string, ImageAsset>;

export type PhotoKey = keyof typeof photos;
