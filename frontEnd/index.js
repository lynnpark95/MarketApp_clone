const calcTime = (timestamp) => {
  //need to update time
  const currTime = new Date().getTime();
  const time = new Date(currTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour} hour ago`;
  else if (minute > 0) `${minute} minute ago`;
  else if (second > 0) `${second} second ago`;
  else "just now";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  //reversing array to display the most recent post
  data.reverse().forEach(async (obj) => {
    const Div = document.createElement("div");
    Div.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "item-list__info";

    const InfoDivTitleDiv = document.createElement("div");
    InfoDivTitleDiv.className = "item-list__info-title";
    InfoDivTitleDiv.innerText = obj.title;

    const InfoDivMetaDiv = document.createElement("div");
    InfoDivMetaDiv.className = "item-list__info-meta";
    InfoDivMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

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
