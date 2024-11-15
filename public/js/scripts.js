document.addEventListener("DOMContentLoaded", function() {
    loadAllSDA();
});

function loadAllSDA() {
    fetch('/api/v1/sda')
        .then(response => response.json())
        .then(data => {
            const sdaContainer = document.getElementById('item-list');
            data.response.forEach(sda => {
                console.log(sda);
                
                const sdaElement = document.createElement('div');
                sdaElement.className = 'sda-item';
                sdaElement.innerHTML = `
                    <h3>${sda.businessName}</h3>
                    <p>${sda.progressiveId}</p>
                    <p><strong>Status:</strong> ${sda.status}</p>
                `;
                sdaContainer.appendChild(sdaElement);
            });
        })
        .catch(error => console.error('Error loading SDA:', error));
}