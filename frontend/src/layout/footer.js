import React from "react";
import Link from "next/link";
import Image from "next/image";
// internal
import payment from '@assets/img/footer/footer-payment.png';
import SocialLinks from "@components/social";
import CopyrightText from "./copyright-text";

// single widget
function SingleWidget({ col, col_2, col_3, title, contents }) {
  return (
    <div
      className={`col-xxl-${col} col-xl-${col} col-lg-3 col-md-${col_2} col-sm-6"`}
    >
      <div className={`footer__widget mb-50 footer-col-11-${col_3}`}>
        <h3 className="footer__widget-title">{title}</h3>
        <div className="footer__widget-content">
          <ul>
            {contents.map((l, i) => (
              <li key={i}>
                <Link href={`/${l.url}`}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <>
      <footer>
        <div
          className="footer__area footer__style-4"
          data-bg-color="footer-bg-white"
        >
          <div className="footer__top">
            <div className="container">
              <div className="row">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                  <div className="footer__widget footer__widget-11 mb-50 footer-col-11-1">
                    <div className="footer__logo">
                      <Link href="/">
                        <h3>ShopEcom</h3>
                      </Link>
                    </div>

                    <div className="footer__widget-content">
                      <div className="footer__info">
                        <p>
                          Lorem ipsum is the filler text that typically demonstrates the font.
                        </p>
                        <div className="footer__social footer__social-11">
                          <SocialLinks />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <SingleWidget
                  col="2"
                  col_2="4"
                  col_3="2"
                  title="Công ty"
                  contents={[
                    { url: "#", title: "Giới thiệu" },
                    { url: "#", title: "Việc làm" },
                    { url: "#", title: "Địa chỉ cửa hàng" },
                    { url: "#", title: "Blog" },
                    { url: "#", title: "Đánh giá" },
                  ]}
                />
                <SingleWidget
                  col="3"
                  col_2="3"
                  col_3="3"
                  title="Shop"
                  contents={[
                    { url: "#", title: "Game & Video" },
                    { url: "#", title: "Phone & Tablets" },
                    { url: "#", title: "Computers & Laptop" },
                    { url: "#", title: "Sport Watches" },
                    { url: "#", title: "Ưu đãi" },
                  ]}
                />
                <SingleWidget
                  col="1"
                  col_2="3"
                  col_3="4"
                  title="Hỗ trợ"
                  contents={[
                    { url: "", title: "FAQs" },
                    { url: "", title: "Đánh giá" },
                    { url: "", title: "Liên hệ" },
                    { url: "", title: "Vận chuyển" },
                    { url: "", title: "Đổi trả" },
                  ]}
                />

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                  <div className="footer__widget mb-50 footer-col-11-5">
                    <h3 className="footer__widget-title">Liên hệ với chúng tôi</h3>

                    <div className="footer__widget-content">
                      <p className="footer__text">
                        Tìm địa chỉ gần nhất. Xem{" "}
                        <a href="#">các cửa hàng</a>
                      </p>
                      <div className="footer__contact">
                        <div className="footer__contact-call">
                          <span>
                            <a href="tel:0987654321">0987654321</a>
                          </span>
                        </div>
                        <div className="footer__contact-mail">
                          <span>
                            <a href="mailto:shopecom.adm@gmail.com">
                              shopecom.adm@gmail.com
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="container">
              <div className="footer__bottom-inner">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="footer__copyright">
                      <CopyrightText />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="footer__payment text-sm-end">
                      <Image src={payment} alt="payment" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
