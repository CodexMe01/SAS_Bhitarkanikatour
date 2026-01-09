// filepath: c:\Users\ASUS\OneDrive\Desktop\boat_booking\Boat_Service - Copy\static\js\admin.js
document.addEventListener('DOMContentLoaded', function() {
    const saveSlotsButton = document.getElementById('save-slots');
    const slotsInput = document.getElementById('slots-input');

    saveSlotsButton.addEventListener('click', function() {
        const slotsData = slotsInput.value;

        fetch('/admin/slots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(slotsData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Slots updated!');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while saving slots.');
        });
    });
});