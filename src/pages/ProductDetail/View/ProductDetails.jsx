import React from "react";
import { BsBoxArrowUp, BsChatDots } from "react-icons/bs";
import { VscReport } from "react-icons/vsc";
import { MdOutlineAddBox } from "react-icons/md";

export default function ProductDetails() {
  return (
    <div>
      <div class="product-detail-main">

        <div class="product-detail-up">
          <img
            src="https://productimages.hepsiburada.net/s/273/550/110000258934394.jpg/format:webp"
            alt="ürün resmi"
          />
          <div class="product-info">
            <h2>Acer Aspire 3 A315-56-327T</h2>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur quae maiores iure ipsam quidem dolor illo quas qui
              optio a nam provident nesciunt doloribus, quibusdam error alias
              ipsa molestias repudiandae. Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>


            <div class="icons">
              <ul>
                <li>
                  <div>
                    <div>
                      <BsBoxArrowUp size="1.5em" />
                    </div>
                    <div class="icon-text">paylaş</div>
                  </div>
                </li>
                <li>
                  <div>
                    {" "}
                    <div>
                      <VscReport size="1.5em" />
                    </div>
                    <div class="icon-text">Şikayet Et</div>
                  </div>
                </li>
                <li>
                  <div>
                    <div>
                      <BsChatDots size="1.5em" />
                    </div>
                    <div class="icon-text">Mesaj Gönder</div>
                  </div>
                </li>
                <li>
                  <div>
                    {" "}
                    <div>
                      <MdOutlineAddBox class=" " size="1.5em" />
                    </div>
                    <div class="icon-text">Talep Et</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="other-details">
            <div class="other-details-user">

              <img
                class="other-details-user-img"
                src="https://pbs.twimg.com/profile_images/1527754460159692800/8nwWVHPB_400x400.jpg"
                alt="ürün resmi"
              />
              <div class="name"> <p>NURULLAH DİRİ</p></div>
            </div>
            <h3>Konum</h3>
            <p>Sivas </p>
            <div class="other-details-location">
              {" "}

              <img
                class="other-details-location-img"
                src="https://cbsakademi.ibb.istanbul/wp-content/uploads/2016/10/kapak.jpg"
                alt="harita"
              />
            </div>
          </div>
        </div>{" "}







        <div class="product-detail-down">
          <div class="product-detail-down-title">
            <h1>Medya & Dosyalar</h1>
          </div>

          <div class="product-detail-down-other-products">
            <ul>
              <li>
                {" "}
                <img
                  class="product-detail-down-other-products-img"
                  src="https://productimages.hepsiburada.net/s/273/550/110000258941693.jpg/format:webp"
                  alt="ürün resmi"
                />
              </li>
              <li>
                {" "}
                <img
                  class="product-detail-down-other-products-img"
                  src="https://productimages.hepsiburada.net/s/273/550/110000258934395.jpg/format:webp"
                  alt="ürün resmi"
                />
              </li>{" "}
              <li>
                {" "}
                <img
                  class="product-detail-down-other-products-img"
                  src=" https://productimages.hepsiburada.net/s/273/550/110000258996365.jpg/format:webp"
                  alt="ürün resmi"
                />
              </li>{" "}
              <li>
                {" "}
                <img
                  class="product-detail-down-other-products-img"
                  src="https://productimages.hepsiburada.net/s/273/550/110000258944437.jpg/format:webp"
                  alt="ürün resmi"
                />
              </li>{" "}
              {/* <li>
              {" "}
              <img
                class="product-detail-down-other-products-img"
                src="https://productimages.hepsiburada.net/s/273/550/110000258938741.jpg/format:webp"
                alt="ürün resmi"
              />
            </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
