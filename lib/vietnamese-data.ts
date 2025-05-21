export interface VietnameseAnimeType {
  _id: string
  name: string
  anotherName: string
  slug: string
  linkImg: string
  des: string
  sumSeri: string
  products: {
    _id: string
    slug: string
    category: string
    seri: string
    isApproved: boolean
  }[]
  type: string
  week: {
    _id: string
    name: string
  }
  up: number
  year: string
  time: string
  hour: string
  lang: string
  quality: string
  isMovie: string
}

// Create an array with the provided anime and some duplicates with modified data for related animes
export const vietnameseAnimeData: VietnameseAnimeType[] = [
  {
    _id: "682bfc864142f040035541ef",
    name: "Đấu Chiến Thiên Hạ",
    anotherName: "Fight For The Throne",
    slug: "dau-chien-thien-ha",
    linkImg:
      "https://res.cloudinary.com/daz3lejjo/image/upload/w_300,h_450,c_fill,f_webp/category/664b9aec66e005d6d76b2aa104fc6404.jpg.webp",
    des: "Thiếu niên thần bí Đại Phong đã cứu Lý Họa Mi, người lâm trọng bệnh sau khi bị kẻ gian ám hại. Đại Phong dự định lên kinh đô tìm sư tỷ, tình cờ đồng hành cùng Lý Họa Mi. Trên đường đi, Lý Họa Mi kinh ngạc phát hiện sư tỷ của chàng chính là Nữ hoàng Tần Chiêu, người liên tục phái thích khách truy sát họ. Để làm rõ nguyên do, Đại Phong và Lý Họa Mi quyết định nương tựa lẫn nhau, cùng chung sức chống lại kẻ địch. Khi giang hồ dậy sóng, triều đình tranh đấu càng thêm khốc liệt. Hai người vô tình bị cuốn vào một âm mưu đầy toan tính và hiểm ác. Đại Phong chính là chìa khóa để giải mã tất cả những bí ẩn đó…",
    sumSeri: "48",
    products: [
      {
        _id: "682bfd6c4142f04003554279",
        slug: "dau-chien-thien-ha-episode-38",
        category: "682bfc864142f040035541ef",
        seri: "38",
        isApproved: true,
      },
    ],
    type: "Tiên Hiệp",
    week: {
      _id: "64f6e057ccf879ddf9bb6333",
      name: "Thứ 3",
    },
    up: 96,
    year: "2025",
    time: "15-20 Phút",
    hour: "10h",
    lang: "Vietsub",
    quality: "HD",
    isMovie: "drama",
  },
  // Additional fake entries for related animes
  {
    _id: "682bfc864142f040035541f0",
    name: "Vũ Động Càn Khôn",
    anotherName: "Martial Universe",
    slug: "vu-dong-can-khon",
    linkImg: "/placeholder.svg?height=450&width=300",
    des: "Cố Vân là một thiếu niên bình thường trong một gia tộc nhỏ, tình cờ có được một chiếc nhẫn kỳ lạ chứa đựng sức mạnh vô biên. Từ đó, anh bắt đầu hành trình tu luyện võ đạo, khám phá những bí mật về thế giới võ thuật và nguồn gốc của chiếc nhẫn.",
    sumSeri: "60",
    products: [],
    type: "Tiên Hiệp",
    week: {
      _id: "64f6e057ccf879ddf9bb6334",
      name: "Thứ 4",
    },
    up: 88,
    year: "2024",
    time: "20-25 Phút",
    hour: "12h",
    lang: "Vietsub",
    quality: "HD",
    isMovie: "drama",
  },
  {
    _id: "682bfc864142f040035541f1",
    name: "Đấu Phá Thương Khung",
    anotherName: "Battle Through the Heavens",
    slug: "dau-pha-thuong-khung",
    linkImg: "/placeholder.svg?height=450&width=300",
    des: "Tiêu Viêm, một thiên tài võ thuật, bỗng nhiên mất đi tất cả tài năng và trở thành trò cười của mọi người. Nhưng với sự giúp đỡ của Dược Lão, một linh hồn cổ đại sống trong chiếc nhẫn của cậu, Tiêu Viêm bắt đầu hành trình tìm lại sức mạnh và khám phá bí mật về mẹ mình.",
    sumSeri: "52",
    products: [],
    type: "Tiên Hiệp",
    week: {
      _id: "64f6e057ccf879ddf9bb6335",
      name: "Thứ 5",
    },
    up: 92,
    year: "2023",
    time: "20 Phút",
    hour: "18h",
    lang: "Vietsub",
    quality: "HD",
    isMovie: "drama",
  },
  {
    _id: "682bfc864142f040035541f2",
    name: "Tiên Nghịch",
    anotherName: "Immortal Odyssey",
    slug: "tien-nghich",
    linkImg: "/placeholder.svg?height=450&width=300",
    des: "Trương Tiểu Phàm, một thanh niên bình thường, vô tình phát hiện mình có khả năng nhìn thấy linh hồn và ma quỷ. Khi một cô gái xinh đẹp xuất hiện và tiết lộ về thế giới tu tiên, anh bắt đầu hành trình khám phá sức mạnh tiềm ẩn và nguồn gốc bí ẩn của mình.",
    sumSeri: "40",
    products: [],
    type: "Tiên Hiệp",
    week: {
      _id: "64f6e057ccf879ddf9bb6336",
      name: "Thứ 6",
    },
    up: 85,
    year: "2024",
    time: "18-22 Phút",
    hour: "20h",
    lang: "Vietsub",
    quality: "HD",
    isMovie: "drama",
  },
  {
    _id: "682bfc864142f040035541f3",
    name: "Nguyên Long",
    anotherName: "Origin Dragon",
    slug: "nguyen-long",
    linkImg: "/placeholder.svg?height=450&width=300",
    des: "Trong một thế giới nơi rồng và con người cùng tồn tại, Lý Nguyên, một chàng trai trẻ phát hiện ra mình có khả năng giao tiếp với rồng. Khi một loạt các cuộc tấn công bí ẩn nhắm vào các loài rồng, anh phải hợp tác với một nữ hiệp sĩ để điều tra và bảo vệ sự cân bằng giữa hai thế giới.",
    sumSeri: "36",
    products: [],
    type: "Huyền Huyễn",
    week: {
      _id: "64f6e057ccf879ddf9bb6337",
      name: "Thứ 7",
    },
    up: 78,
    year: "2025",
    time: "22 Phút",
    hour: "19h",
    lang: "Vietsub",
    quality: "HD",
    isMovie: "drama",
  },
]
