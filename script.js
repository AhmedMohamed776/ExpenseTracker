// تعريف المتغيرات الأولةية التي تأخذ قيمة الأزرار ونماذج الإدخال

let form1 = document.forms[0];
let form2 = document.forms[1];
form1.style.display = "none";
form2.style.display = "none";
let addAmountButton = document.getElementById("addAmountBTN");
let addTransactionButton = document.getElementById("addTransactionBTN");

// دالة لإضافة العناصر إلى الصفحة

function addElements(num, name, date, amount) {

  // إنشاء الصفوف والخلايى في الجدول

  let newRow = document.createElement("tr");
  let newRow2 = document.createElement("tr");
  let tNum = document.createElement("td");
  let tName = document.createElement("td");
  let tDate = document.createElement("td");
  let tAmount = document.createElement("td");
  let tOreginalAmount = document.createElement("td");
  let tRemainingAmount = document.createElement("td");
  balens -= amount;

  // إضافة البيانات إلى الأعمدة

  tNum.appendChild(document.createTextNode(num));
  tName.appendChild(document.createTextNode(name));
  tDate.appendChild(document.createTextNode(date));
  tAmount.appendChild(document.createTextNode(amount));
  tOreginalAmount.appendChild(document.createTextNode(balens + amount));
  tRemainingAmount.appendChild(document.createTextNode(balens));

  // إضافة الأعمدة إلى الصفوف

  newRow.appendChild(tName);
  newRow.appendChild(tDate);
  newRow.appendChild(tAmount);
  newRow.appendChild(tRemainingAmount);

  // إظهار 3 معاملات مالية فقط في جدول آخر المعاملات المالية

  if (lastTransactions.children.length === 3) {
    lastTransactions.lastElementChild.remove();
  }

  // إضافة الصف إلى الجدول

  lastTransactions.prepend(newRow);
  newRow2.appendChild(tNum);
  newRow2.appendChild(tName.cloneNode(true));
  newRow2.appendChild(tDate.cloneNode(true));
  newRow2.appendChild(tAmount.cloneNode(true));
  newRow2.appendChild(tOreginalAmount);
  newRow2.appendChild(tRemainingAmount.cloneNode(true));
  allTransactions.prepend(newRow2);
}

// إنشاء أماكن لتخزين البيانات في التخزين المحلي الخاص بالمتصفح

let transactionsStorage = [];
let amountStorage = {};

addAmountButton.onclick = function () {
  document.getElementById("navList").style.display = "none";
  document.getElementById("box").style.display = "none";
  form2.style.display = "none";
  form1.style.display = "block";
  document.getElementById("amountName").focus();
};
addTransactionButton.onclick = function () {
  if (!amountValue) {
    alert("يرجى إضافة مبلغ مالي أولاً");
  } else {
    document.getElementById("navList").style.display = "none";
    document.getElementById("box").style.display = "none";
    form1.style.display = "none";
    form2.style.display = "block";
    document.getElementById("transactionName").focus();
  }
};
document.querySelectorAll(".cancelBTN").forEach(function (element) {
  element.onclick = function () {
    form1.style.display = "none";
    form2.style.display = "none";
    document.getElementById("navList").style.display = "block";
    document.getElementById("box").style.display = "block";
  };
});

let amountName = null;
let amountValue = 0;
let amountDate = null;
let balens = 0;

// دالة لعرض معلومات مختصرة في أعلى الصفحة

function showInfo(title, value, date) {
  let amountInfo = document.getElementById("amountInfo");
  let amountTitle = document.createElement("h2");
  let amountParagraph = document.createElement("p");
  let addDate = document.createElement("p");

  amountTitle.innerText = `اسم المبلغ: ${title}`;
  amountParagraph.innerText = `إجمالي المبلغ: ${value}`;
  addDate.innerText = `تاريخ الإضافة: ${date}`;

  amountInfo.innerHTML = "";

  amountInfo.appendChild(amountTitle);
  amountInfo.appendChild(amountParagraph);
  amountInfo.appendChild(addDate);
  addAmountButton.innerText = "تعديل المبلغ";
}

form1.onsubmit = function (event) {
  event.preventDefault();
  amountName = document.getElementById("amountName").value;
  amountValue = parseInt(document.getElementById("amountInput").value);
  amountDate = document.getElementById("amountDate").value;
  balens = amountValue;

  amountStorage.name = amountName;
  amountStorage.value = amountValue;
  amountStorage.date = amountDate;
  showInfo(amountName, amountValue, amountDate);

  localStorage.setItem("amountData", JSON.stringify(amountStorage));
  form1.style.display = "none";
  document.getElementById("navList").style.display = "block";
  document.getElementById("box").style.display = "block";
  document.getElementById("hr").style.display = "block";
};

let transactionNumber = 1;
let transactionName = null;
let transactionAmount = 0;
let transactionDate = null;
let lastTransactions = document.getElementById("lastTransactions");
let allTransactions = document.getElementById("allTransactions");

form2.onsubmit = function (event) {
  event.preventDefault();
  
  transactionName = document.getElementById("transactionName").value;
  transactionDate = document.getElementById("transactionDate").value;
  transactionAmount = parseInt(
    document.getElementById("transactionAmount").value,
  );
  if (transactionAmount > balens) {
    alert("مبلغ المعاملة أكبر من المبلغ المتبقي");
  } else {
    addElements(
      transactionNumber,
      transactionName,
      transactionDate,
      transactionAmount,
    );
    form2.style.display = "none";
    document.getElementById("navList").style.display = "block";
    document.getElementById("box").style.display = "block";
    transactionNumber ++;
    transactionsStorage.push({
      name: transactionName,
      date: transactionDate,
      amount: transactionAmount,
    });
    localStorage.setItem(
      "transactionsData",
      JSON.stringify(transactionsStorage),
    );
  }
};
let showReportBTN = document.getElementById("showReport");
let closBTN = document.getElementById("clos");
showReportBTN.onclick = () => {
  document.getElementById("report").style.display = "block";
  document.getElementById("box2").style.display = "none";
};
closBTN.onclick = () => {
  document.getElementById("report").style.display = "none";
  document.getElementById("box2").style.display = "block";
};

window.onload = function () {
  aData = JSON.parse(localStorage.getItem("amountData"));
  if (aData) {
    amountValue = parseInt(aData.value);
    balens = amountValue;
    showInfo(aData.name, aData.value, aData.date);
    document.getElementById("hr").style.display = "block"
  }
  tData = JSON.parse(localStorage.getItem("transactionsData"));
  if (tData) {
    transactionsStorage = tData;
    tData.forEach(function (element) {
      addElements(
        transactionNumber,
        element.name,
        element.date,
        element.amount,
      );
      transactionNumber++;
    });
  }
};
