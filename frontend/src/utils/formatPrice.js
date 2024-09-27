const formatPrice = (price) => {
  price = price ?? 0
  return price.toLocaleString("vi", {
    style: "currency",
    currency: "VND"
  })
}

export default formatPrice