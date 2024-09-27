const menu_data = [
  {
    id: 1,
    title: 'Trang chủ',
    link: '/',
  },
  {
    id: 2,
    title: 'Giới thiệu',
    link: '#'
  },
  // {
  //   id: 3,
  //   title: 'Liên hệ',
  //   link: '#'
  // },
  {
    id: 4,
    title: 'Mua sắm',
    link: '/shop'
  },
  {
    id: 5,
    hasDropdown: true,
    title: 'Danh mục',
    link: '#',
    submenus: [
      { title: 'Điện thoại', link: '/shop?category=điện-thoại' },
      { title: 'Máy tính bảng', link: '/shop?category=máy-tính-bảng' },
      { title: 'Laptop', link: '/shop?category=laptop' },
      { title: 'Máy tính để bàn', link: '/shop?category=máy-tính-để-bàn' },
      { title: 'Thực tế ảo', link: '/shop?category=kính-thực-tế-ảo' },
    ]
  },
  {
    id: 6,
    hasDropdown: true,
    title: 'Thương hiệu',
    title: 'Thương hiệu',
    link: '#',
    submenus: [
      { title: 'Apple', link: '/shop?brand=apple' },
      { title: 'Samsung', link: '/shop?brand=samsung' },
      { title: 'Sony', link: '/shop?brand=sony' },
      { title: 'Lenovo', link: '/shop?brand=lenovo' },
      { title: 'Logitech', link: '/shop?brand=logitech' },
      { title: 'Deepcool', link: '/shop?brand=deepcool' }
    ]
  },
  {
    id: 7,
    hasDropdown: true,
    title: 'Cửa hàng',
    title: 'Cửa hàng',
    link: '#',
    submenus: [
      { title: 'Amazon', link: '/shop?Store=amazon' },
      { title: 'Flipkart', link: '/shop?Store=flipkart' },
      { title: 'Alibaba', link: '/shop?Store=alibaba' },
      { title: 'Daraz', link: '/shop?Store=daraz' },
      { title: 'Zomata', link: '/shop?Store=zomato' },
      { title: 'Fedex', link: '/shop?Store=fedex' }
    ]
  }
]

export default menu_data;
