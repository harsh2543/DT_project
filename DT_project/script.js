// Sample JSON Data
const jsonData = {
    "continents": [
        {
            "name": "North America",
            "countries": [
                {
                    "name": "USA",
                    "states": [
                        {
                            "name": "California",
                            "tasks": [
                                {
                                    "assets": [
                                        {
                                            "type": "video",
                                            "url": "video-california.mp4",
                                            "description": "A video about California"
                                        },
                                        {
                                            "type": "image",
                                            "url": "california-image.jpg",
                                            "description": "A beautiful image of California"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

// Reusable function to create asset containers
function createAssetContainer(asset) {
    let assetHTML = "";

    if (asset.type === "video") {
        assetHTML = `
            <div class="asset-container">
                <div class="asset">
                    <video controls>
                        <source src="${asset.url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="description">
                    <button class="toggle-arrow" onclick="toggleDescription(this)">&#9660;</button>
                    <p class="description-text">${asset.description}</p>
                </div>
            </div>
        `;
    } else if (asset.type === "image") {
        assetHTML = `
            <div class="asset-container">
                <div class="asset">
                    <img src="${asset.url}" alt="${asset.description}">
                </div>
                <div class="description">
                    <button class="toggle-arrow" onclick="toggleDescription(this)">&#9660;</button>
                    <p class="description-text">${asset.description}</p>
                </div>
            </div>
        `;
    }

    return assetHTML;
}

// Function to render data hierarchically
function renderData(jsonData) {
    const contentDiv = document.getElementById("content");

    jsonData.continents.forEach(continent => {
        const continentDiv = document.createElement("div");
        continentDiv.classList.add("continent");

        continentDiv.innerHTML = `<h2>${continent.name}</h2>`;
        
        continent.countries.forEach(country => {
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("country");

            countryDiv.innerHTML = `<h3>${country.name}</h3>`;
            
            country.states.forEach(state => {
                const stateDiv = document.createElement("div");
                stateDiv.classList.add("state");

                stateDiv.innerHTML = `<h4>${state.name}</h4>`;

                state.tasks.forEach(task => {
                    task.assets.forEach(asset => {
                        // Append asset containers to the state div
                        stateDiv.innerHTML += createAssetContainer(asset);
                    });
                });

                countryDiv.appendChild(stateDiv);
            });

            continentDiv.appendChild(countryDiv);
        });

        contentDiv.appendChild(continentDiv);
    });
}

// Toggle description visibility
function toggleDescription(button) {
    const descriptionText = button.nextElementSibling;
    const isExpanded = descriptionText.style.display === 'block';
    descriptionText.style.display = isExpanded ? 'none' : 'block';
    button.innerHTML = isExpanded ? '&#9660;' : '&#9650;';
}

// Render the JSON data
renderData(jsonData);
