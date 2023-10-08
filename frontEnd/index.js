/* <div class="item-list">
          <div class="item-list__img">
            <img src="assets/img.svg" alt="" />
          </div>
          <div class="item-list__info">
            <div class="item-list__info-title">Barbie Doll</div>
            <div class="item-list__info-meta">New York City</div>
            <div class="item-list__info-price">$1000</div>
          </div>
        </div> */

const renderData = (data) => {
  const main = document.querySelector("main");

  data.forEach((obj) => {
    const Div = document.createElement("div");
    Div.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    const img = document.createElement("img");
    img.src = "assets/img.svg";

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "item-list__info";

    const InfoDivTitleDiv = document.createElement("div");
    InfoDivTitleDiv.className = "item-list__info-title";
    InfoDivTitleDiv.innerText = obj.title;

    const InfoDivMetaDiv = document.createElement("div");
    InfoDivMetaDiv.className = "item-list__info-meta";
    InfoDivMetaDiv.innerText = obj.place;

    const InfoDivPriceDiv = document.createElement("div");
    InfoDivPriceDiv.className = "item-list__info-price";
    InfoDivPriceDiv.innerText = obj.price;

    InfoDiv.appendChild(InfoDivTitleDiv);
    InfoDiv.appendChild(InfoDivMetaDiv);
    InfoDiv.appendChild(InfoDivPriceDiv);
    imgDiv.appendChild(img);
    Div.appendChild(imgDiv);
    Div.appendChild(InfoDiv);
    main.appendChild(Div);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
