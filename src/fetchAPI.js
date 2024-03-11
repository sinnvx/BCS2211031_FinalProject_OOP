function buttonClicked() {
    var searchdata = document.getElementById("countryinput").value;

    fetch(`https://restcountries.com/v3.1/all`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Search for the country based on its common name
            const country = data.find(country => country.name.common.toLowerCase() === searchdata.toLowerCase());
            if (country) {
                // Update the HTML elements with the country information
                document.getElementById("common").textContent = country.name.common;
                document.getElementById("officialname").textContent = country.name.official;
                document.getElementById("capital").textContent = country.capital;
                document.getElementById("region").textContent = country.region;

                const currencyCode = Object.keys(country.currencies)[0]; // Assuming you want the first currency
                const currency = country.currencies[currencyCode];
                const currencyInfo = `${currency.name} (${currency.symbol})`;
                
                document.getElementById("currencies").textContent = currencyInfo;
                
                const languages = country.languages;
                const languageInfo = Object.entries(languages).map(([code, name]) => `${name} (${code})`).join(", ");
                document.getElementById("languages").textContent = languageInfo;
                
                document.getElementById("population").textContent = country.population;
                document.getElementById("borders").textContent = country.borders;

                const continents = country.continents.join(", "); // Convert the array to a string
                document.getElementById("continents").textContent = continents;

                const googleMapsLink = country.maps.googleMaps;
                document.getElementById("googlemap").href = googleMapsLink;
                
                const timezones = country.timezones.slice(0, 2); // Extract the first two timezones
                const timezoneInfo = timezones.join(", ");
                document.getElementById("timezones").textContent = timezoneInfo;

                // Display the flag image
                document.getElementById("flag").src = country.flags.png; // or country.flags.svg if you prefer SVG format
                // document.getElementById("flag").alt = country.flags.alt;
            } else {
                alert("Country not found!");
            }
        })
        .catch(error => console.error('Error:', error));
}
