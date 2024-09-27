import SEO from "@components/seo";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import CartBreadcrumb from "@components/cart/cart-breadcrumb";
import ShopCta from "@components/cta";
import CompareArea from "@components/compare/compare-area";

export default function Comparelist() {
  return (
    <Wrapper>
      <SEO pageTitle={"So sánh sản phẩm"} />
      <Header style_2={true} />
      <CartBreadcrumb title='So sánh sản phẩm' subtitle='Danh sách so sánh sản phẩm' />
      <CompareArea />
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
