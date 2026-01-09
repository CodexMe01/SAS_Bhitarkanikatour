document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const bookingForm = document.getElementById('booking-form');
    const paymentButton = document.getElementById('payment-button');

    // Set minimum date to today
    if (dateInput) {
        // Use local date instead of UTC to avoid off-by-one errors
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;

        dateInput.min = today;
        dateInput.value = today;

        // Load slots when date changes
        dateInput.addEventListener('change', loadTimeSlots);
        loadTimeSlots(); // Load initial slots
    }

    function convertTo24Hour(time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);

        if (modifier === 'AM' && hours === 12) {
            hours = 0;
        } else if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        }

        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }

    function loadTimeSlots() {
        if (!dateInput || !timeSelect) return;

        const selectedDate = dateInput.value;
        if (!selectedDate) return;

        fetch(`/api/slots?date=${selectedDate}`)
            .then(response => response.json())
            .then(data => {
                timeSelect.innerHTML = '<option value="">Select Time</option>';
                if (data.available && data.available.length > 0) {
                    data.available.forEach(time => {
                        const option = document.createElement('option');
                        // Convert 12-hour format back to 24-hour for form submission
                        option.value = convertTo24Hour(time);
                        option.textContent = time;
                        timeSelect.appendChild(option);
                    });
                } else {
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'No slots available';
                    option.disabled = true;
                    timeSelect.appendChild(option);
                }
            })
            .catch(error => {
                console.error('Error loading slots:', error);
                timeSelect.innerHTML = '<option value="">Error loading slots</option>';
            });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(bookingForm);
            fetch('/pay', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    document.getElementById('payment-container').innerHTML = data;
                })
                .catch(error => console.error('Error:', error));
        });
    }

    if (paymentButton) {
        paymentButton.addEventListener('click', function () {
            const bookingToken = paymentButton.getAttribute('data-booking-token');
            const orderId = paymentButton.getAttribute('data-order-id');

            const razorpayOptions = {
                key: document.getElementById('razorpay-key-id').value,
                amount: paymentButton.getAttribute('data-amount'),
                currency: 'INR',
                name: 'Boat Service',
                description: 'Booking Payment',
                order_id: orderId,
                handler: function (response) {
                    fetch('/verify_payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            booking_token: bookingToken
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                window.location.href = '/success';
                            } else {
                                alert('Payment verification failed. Please try again.');
                            }
                        });
                },
                prefill: {
                    name: document.getElementById('customer-name').value,
                    email: document.getElementById('customer-email').value,
                    contact: document.getElementById('customer-phone').value
                },
                theme: {
                    color: '#F37254'
                }
            };

            const rzp = new Razorpay(razorpayOptions);
            rzp.open();
            event.preventDefault();
        });
    }
});