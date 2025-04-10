document.addEventListener("DOMContentLoaded", function () {
    M.AutoInit(); // Inicializa automaticamente todos os componentes

    // Inicializa manualmente os tabs
    var tabs = document.querySelectorAll(".tabs");
    M.Tabs.init(tabs);

    // Inicializa manualmente o sidenav
    var sidenavs = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenavs);

    // Inicializa o select
    var selects = document.querySelectorAll("select");
    M.FormSelect.init(selects);
});
