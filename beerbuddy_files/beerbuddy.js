document.addEventListener("DOMContentLoaded", function () {
    const rowsPerPage = 8;
    let currentPage = 1;
    let totalPages = 1;
    let data = [];
    let filteredData = [];
    let ascending = true;
    let selectedSort = 1;
    let includeLager = true;
    let includeAle = true;
    let includeCider = true;

    function renderTable() {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = filteredData.slice(start, end);

        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = "";

        paginatedData.forEach((item) => {
            const row = `<tr>
                            <td>${item['Name']}</td>
                            <td>${item['Price ($)']}</td>
                            <td>${item['Quantity']}</td>
                            <td>${item['Volume (mL)']}</td>
                            <td>${item['ABV (%)']}</td>
                            <td>${item['Container']}</td>
                            <td>${item['Type']}</td>
                            <td>${item['Cost per mL of Alcohol ($)']}</td>
                            <td>${item['Cost per Unit ($)']}</td>
                            <td>${item['Total Volume (mL)']}</td>
                            <td>${item['Total Alcohol Content (mL)']}</td>
                         </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        });

        updatePagination();
    }

    function updatePagination() {
        totalPages = Math.ceil(filteredData.length / rowsPerPage);
        document.getElementById("total-pages").textContent = `of ${totalPages}`;
        document.getElementById("page-number-input").value = currentPage;

        document.getElementById("prev-page").parentElement.classList.toggle("disabled", currentPage === 1);
        document.getElementById("next-page").parentElement.classList.toggle("disabled", currentPage === totalPages);
    }

    function sortData(key, ascending) {
        filteredData.sort((a, b) => {
            const valueA = parseFloat(a[key]);
            const valueB = parseFloat(b[key]);
            
            if (ascending) {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });
        renderTable();
    }

    function filterData() {
        filteredData = data.filter(item => {
            const whatType = item['Type'];
            
            if (whatType == "Lager" && includeLager == true) {
                return item
            } else if (whatType == "Ale" && includeAle == true) {
                return item
            } else if (whatType == "Cider" && includeCider == true) {
                return item
            }
        });
    
        renderTable();
    }

    document.getElementById("prev-page").addEventListener("click", function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    document.getElementById("next-page").addEventListener("click", function (e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    document.getElementById("page-number-input").addEventListener("change", function (e) {
        let desiredPage = parseInt(e.target.value, 10);
        if (desiredPage >= 1 && desiredPage <= totalPages) {
            currentPage = desiredPage;
            renderTable();
        } else {
            e.target.value = currentPage;
        }
    });

    document.getElementById("sort-cost-per-ml").addEventListener("click", function () {
        if (selectedSort == 2) {
            document.getElementById("sort-cost-per-unit").classList.add("btn-primary");
            document.getElementById("sort-cost-per-unit").classList.remove("btn-success");
        } else if (selectedSort == 3) {
            document.getElementById("sort-total-alcohol").classList.add("btn-primary");
            document.getElementById("sort-total-alcohol").classList.remove("btn-success");
        } else if (selectedSort == 4) {
            document.getElementById("sort-total-volume").classList.add("btn-primary");
            document.getElementById("sort-total-volume").classList.remove("btn-success");
        }
        document.getElementById("sort-cost-per-ml").classList.add("btn-success");
        document.getElementById("sort-cost-per-ml").classList.remove("btn-primary");
        selectedSort = 1;
        sortData('Cost per mL of Alcohol ($)', ascending);
    });

    document.getElementById("sort-cost-per-unit").addEventListener("click", function () {
        if (selectedSort == 1) {
            document.getElementById("sort-cost-per-ml").classList.add("btn-primary");
            document.getElementById("sort-cost-per-ml").classList.remove("btn-success");
        } else if (selectedSort == 3) {
            document.getElementById("sort-total-alcohol").classList.add("btn-primary");
            document.getElementById("sort-total-alcohol").classList.remove("btn-success");
        } else if (selectedSort == 4) {
            document.getElementById("sort-total-volume").classList.add("btn-primary");
            document.getElementById("sort-total-volume").classList.remove("btn-success");
        }
        document.getElementById("sort-cost-per-unit").classList.add("btn-success");
        document.getElementById("sort-cost-per-unit").classList.remove("btn-primary");
        selectedSort = 2;
        sortData('Cost per Unit ($)', ascending);
    });

    document.getElementById("sort-total-alcohol").addEventListener("click", function () {
        if (selectedSort == 1) {
            document.getElementById("sort-cost-per-ml").classList.add("btn-primary");
            document.getElementById("sort-cost-per-ml").classList.remove("btn-success");
        } else if (selectedSort == 2) {
            document.getElementById("sort-cost-per-unit").classList.add("btn-primary");
            document.getElementById("sort-cost-per-unit").classList.remove("btn-success");
        } else if (selectedSort == 4) {
            document.getElementById("sort-total-volume").classList.add("btn-primary");
            document.getElementById("sort-total-volume").classList.remove("btn-success");
        }
        document.getElementById("sort-total-alcohol").classList.add("btn-success");
        document.getElementById("sort-total-alcohol").classList.remove("btn-primary");
        selectedSort = 3;
        sortData('Total Alcohol Content (mL)', ascending);
    });

    document.getElementById("sort-total-volume").addEventListener("click", function () {
        if (selectedSort == 1) {
            document.getElementById("sort-cost-per-ml").classList.add("btn-primary");
            document.getElementById("sort-cost-per-ml").classList.remove("btn-success");
        } else if (selectedSort == 2) {
            document.getElementById("sort-cost-per-unit").classList.add("btn-primary");
            document.getElementById("sort-cost-per-unit").classList.remove("btn-success");
        } else if (selectedSort == 3) {
            document.getElementById("sort-total-alcohol").classList.add("btn-primary");
            document.getElementById("sort-total-alcohol").classList.remove("btn-success");
        }
        document.getElementById("sort-total-volume").classList.add("btn-success");
        document.getElementById("sort-total-volume").classList.remove("btn-primary");
        selectedSort = 4
        sortData('Total Volume (mL)', ascending);
    });
    
    document.getElementById("ascend-descend").addEventListener("click", function () {
        if (ascending == true) {
            ascending = false;
            document.getElementById("ascend-descend").innerHTML = "Descending";
        } else {
            ascending = true;
            document.getElementById("ascend-descend").innerHTML = "Ascending";
        }
    });


    document.getElementById("filter-lager").addEventListener("click", function () {
        this.classList.toggle("active");
        if (document.getElementById("filter-lager").innerHTML == "Including Lager") {;
            includeLager = false;
            document.getElementById("filter-lager").innerHTML = "Excluding Lager";
        } else {
            includeLager = true;
            document.getElementById("filter-lager").innerHTML = "Including Lager";
        }
        filterData();
    });

    document.getElementById("filter-ale").addEventListener("click", function () {
        this.classList.toggle("active");
        if (document.getElementById("filter-ale").innerHTML == "Including Ale") {
            includeAle = false;
            document.getElementById("filter-ale").innerHTML = "Excluding Ale";
        } else {
            includeAle = true;
            document.getElementById("filter-ale").innerHTML = "Including Ale";
        }
        filterData();
    });

    document.getElementById("filter-cider").addEventListener("click", function () {
        this.classList.toggle("active");
        if (document.getElementById("filter-cider").innerHTML == "Including Cider") {
            includeCider = false;
            document.getElementById("filter-cider").innerHTML = "Excluding Cider";
        } else {
            includeCider = true;
            document.getElementById("filter-cider").innerHTML = "Including Cider";
        }
        filterData();
    });

    Papa.parse("lcbo_data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            data = results.data;
            filteredData = data; // Initialize filteredData with the full data set
            renderTable();
            sortData('Cost per mL of Alcohol ($)', ascending);
        }
    });
});

document.getElementById("icon-and-text-projects").addEventListener("click", function() {
    window.location.href = "../index.html";
});

document.getElementById("icon-and-text-music").addEventListener("click", function() {
    window.location.href = "../music_files/music.html";
});

document.getElementById("icon-and-text-simulation").addEventListener("click", function() {
    window.location.href = "../simulation_files/simulation.html";
});

document.getElementById("icon-and-text-beer").addEventListener("click", function() {
    window.location.href = "../beerbuddy_files/beerbuddy.html";
});
