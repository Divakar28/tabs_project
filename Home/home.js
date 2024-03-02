
var TabsData = [];
var element = document.getElementById("mainDiv");
var Tabs = document.getElementById("list");
var TabView = document.getElementById("Tabview");
var newTab = document.getElementById("AdTab");
var goToUrl = document.getElementsByClassName("submitbtn");
var activeTab = "";
var isTabClicked = false;
var inputData = "";
var addUrl = "";

var tabdetailedview = document.createElement("div");
var tabdetailedviewbtninp = document.createElement("div");
var tabdetailedviewiframe = document.createElement("div");
tabdetailedview.className = "tabviewDetails";
var inputElement = document.createElement("input");
var buttonElement = document.createElement("button");
var iframeElement = document.createElement("iframe");

function addNewTab() {

    console.log('CLICKEDDDDDDDDDDD',TabsData);
     element.classList.add("main");


        for (var i = 0; i < TabsData.length; i++) {
            var tabItem = document.createElement("div");
            var tabText = document.createElement("span");
            var iconElement = document.createElement("i");
            iconElement.classList.add("fa", "fa-remove"); 
            tabText.textContent = TabsData[i].name;
    
            tabItem.className = "singleTab";
    
            if(activeTab == TabsData[i].name) {
                tabItem.className = "activeTab";
            }
            tabItem.appendChild(tabText);
            tabItem.appendChild(iconElement);
    
            Tabs.appendChild(tabItem);
    
            iconElement.addEventListener('click', removeTab);
    
    
    
            tabItem.addEventListener('click', function () {
                inputElement.value = "";
                iframeElement.src = "about:blank";
                iframeElement.setAttribute("width", "0");
                iframeElement.setAttribute("height", "0");
                setTimeout(() => {
                    TabsData.forEach(val => {
                        if(val.name == this.textContent && val.url != "") {
                            inputElement.value = val.url;
                            addIframe();
                        }
                    });
                });
                console.log('this.textContent',this.textContent);
                activeTab = this.textContent;
                Tabs.innerHTML = "";
                addNewTab();
            });
        }
        createInputButton();
}

function removeTab(){
    event.stopPropagation();

    var parent = this.parentNode;
    var child = parent.querySelector('span').innerHTML;

    let ind = TabsData.findIndex(val => val.name == child);

    TabsData.splice(ind,1);
    

    if(TabsData.length == 0){
        element.style.visibility = 'hidden';
    }

    Tabs.innerHTML = "";
    addNewTab();

    console.log('TabsData',TabsData);
}

function createInputButton() {
    TabView.innerHTML = "";
   
    buttonElement.textContent = "GO";
    inputElement.setAttribute("placeholder", "Enter your URL");
    inputElement.setAttribute("type", "text");

    inputElement.className = "SearchUrl";
    buttonElement.className = "submitbtn";
    tabdetailedviewbtninp.className = 'btinpClass';
    tabdetailedviewiframe.className = 'iframeView';
    addUrl = document.getElementsByClassName('submitbtn');

    // tabdetailedview.appendChild(inputElement);
    // tabdetailedview.appendChild(buttonElement);
    tabdetailedviewbtninp.appendChild(inputElement);
    tabdetailedviewbtninp.appendChild(buttonElement);
    tabdetailedview.appendChild(tabdetailedviewbtninp);
    tabdetailedview.appendChild(tabdetailedviewiframe);
    TabView.appendChild(tabdetailedview);


}



// Add New Tab
newTab.addEventListener('click', function () {
    element.style.visibility = 'visible';
    inputElement.value = "";
    iframeElement.src = "about:blank";
    iframeElement.setAttribute("width", "0");
    iframeElement.setAttribute("height", "0");
    var inputValue = document.getElementById("tabText").value;
    if (inputValue == "" || inputValue == null) {
        alert("Please Enter Tab Name");
        return;
    } else {

        inputData = inputValue;

        if(TabsData.length == 0){
            activeTab = inputValue
            TabsData.push({ name: inputValue, url: "" }); 
        } else {
            let data = TabsData.filter(val => {
                return val.name == inputData;
            });
            data.length > 0 ? alert("Tab Name Should Be Different") : TabsData.push({ name: inputValue, url: "" });
        }
                      
        document.getElementById("tabText").value = null;
        Tabs.innerHTML = "";
        addNewTab();
    }
});

function addIframe(){
    console.log('bbbbbbbbbbbbbbbb');


    if(inputElement.value == ""){
        alert("Please Enter An URL");
        return;
    } else {

        TabsData.forEach((val,i) => {
            console.log(activeTab == val.name,inputElement.value)
            if(activeTab == val.name) {
                TabsData[i].url = inputElement.value;
            }
        });

        console.log('TabsData',TabsData);


        
        iframeElement.setAttribute("id", "myIframe");
        iframeElement.setAttribute("width", "1000");
        iframeElement.setAttribute("height", "400");

        tabdetailedviewiframe.appendChild(iframeElement);
        iframeElement.setAttribute("src", inputElement.value);      
    }
}

buttonElement.addEventListener('click', addIframe);




