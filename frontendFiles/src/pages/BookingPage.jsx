import React, { useMemo, useState, useEffect } from "react";
import SEO from '../components/SEO';
import {
  ArrowLeft,
  ArrowRight,
  Anchor,
  Ship,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube
} from "lucide-react";
import ImportantInfoSection from '../components/ImportantInfoSection';

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function endOfMonth(d) { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
function toMondayIndex(jsIndex) { return (jsIndex + 6) % 7; }
function formatYMD(d) {
  const mm = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}
const todayMidnight = new Date(); todayMidnight.setHours(0, 0, 0, 0);
const todayYMD = formatYMD(todayMidnight);

export default function BookingPage() {
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [slot, setSlot] = useState(null);
  const [guests, setGuests] = useState({ total: "", children: "" });
  const [showCapacityWarning, setShowCapacityWarning] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const monthMeta = useMemo(() => {
    const start = startOfMonth(viewDate);
    const end = endOfMonth(viewDate);
    const daysInMonth = end.getDate();
    const leading = toMondayIndex(start.getDay());
    const cells = [];
    for (let i = 0; i < leading; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return { cells };
  }, [viewDate]);

  const monthLabel = viewDate.toLocaleString("en-US", { month: "long", year: "numeric" });
  function prevMonth() { setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1)); }
  function nextMonth() { setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1)); }
  function onSelectDay(d) { setSelectedDate(d); }

  function onSubmit() {
    if (!selectedDate) return alert("Please select a date.");
    if (!slot) return alert("Please select a slot.");
    if (!guests.total) return alert("Please enter total guests.");

    // Validate maximum capacity (18 people excluding children under 3)
    const totalPeople = parseInt(guests.total);
    if (totalPeople > 18) {
      const message = `Maximum 18 people per boat (excluding children under 3).\n\nYou have ${totalPeople} people. If you need to book for more than 18 people, you'll need to make separate bookings for additional boats.\n\nWould you like to proceed with 18 people for this booking?`;
      if (!confirm(message)) {
        return;
      }
      // Update guests to 18 if user confirms
      setGuests(prev => ({ ...prev, total: "18" }));
    }

    // Store booking data in sessionStorage for the registration page
    const bookingData = {
      date: selectedDate.toDateString(),
      slot: slot === "first" ? "First Shift (7:00 am - 10:00 am)" : "Second Shift (1:30 am - 4:30 am)",
      guests: guests.total,
      children: guests.children || 0,
      route: "From Khola To Dangmal"
    };
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

    // Redirect to registration page
    window.location.href = '/registration';
  }

  const selectedYMD = selectedDate ? formatYMD(selectedDate) : null;

  return (
    <div className="min-h-screen w-full bg-[#f9f9f4] text-[#111111] font-sans">
      <SEO
        title="Book Your Tour"
        description="Secure your Bhitarkanika boat tour online. Select your preferred date, time slot, and route. Hassle-free booking for Khola to Dangmal and other exciting routes."
        canonical="https://stayandsailbhitarkanika.in/booking"
      />
      {/* Booking */}
      <main className="mx-auto max-w-7xl px-3 sm:px-6 py-8 sm:py-10">
        {/* Contact Banner */}
        <div className="mb-8 rounded-xl bg-bhitarkanika-beige/30 p-4 border border-bhitarkanika-beige/50 text-center">
          <p className="text-base sm:text-lg font-medium text-bhitarkanika-text flex items-center justify-center gap-2 flex-wrap">
            <span>📞 For manual booking, contact</span>
            <a href="tel:+919178994463" className="font-bold underline text-bhitarkanika-olive hover:text-bhitarkanika-green">+91 9178994463</a>
            <span className="mx-1">/</span>
            <a href="tel:+917735624663" className="font-bold underline text-bhitarkanika-olive hover:text-bhitarkanika-green">+91 7735624663</a>
            <span>or proceed with online booking below</span>
          </p>
        </div>
        {/* Heading + line */}
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-amaranth font-bold text-bhitarkanika-text tracking-wide">
              From Khola To Dangmal
            </h1>
            <p className="mb-6 text-sm sm:text-base text-gray-600 max-w-2xl">
              Sunset Photography Cruise • Signature Creek Ride
            </p>
            <div className="relative w-full max-w-2xl sm:max-w-3xl">
              {/* Decorative curved path */}
              <div className="relative mb-4">
                <svg viewBox="0 0 500 100" className="w-full h-14 sm:h-16 text-bhitarkanika-olive" preserveAspectRatio="none">
                  {/* Main curved path - more pronounced curve with dotted line */}
                  <path
                    d="M50,50 Q150,10 250,50 T450,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    className="drop-shadow-sm"
                  />
                  {/* Decorative dots along the path */}
                  <circle cx="100" cy="35" r="2" fill="currentColor" className="animate-pulse" />
                  <circle cx="200" cy="15" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <circle cx="300" cy="35" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  <circle cx="400" cy="45" r="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                </svg>

                {/* Start and End points with icons closer to text */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <div className="w-3 h-3 bg-bhitarkanika-green rounded-full shadow-md border border-white"></div>
                  <span className="text-xs font-semibold text-bhitarkanika-text bg-white px-2 py-0.5 rounded-full shadow-sm">Khola</span>
                  <div className="w-6 h-6 bg-bhitarkanika-beige rounded-full flex items-center justify-center shadow-sm ml-1">
                    <Anchor className="w-3 h-3" />
                  </div>
                </div>

                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <div className="w-6 h-6 bg-bhitarkanika-beige rounded-full flex items-center justify-center shadow-sm mr-1">
                    <Ship className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold text-bhitarkanika-text bg-white px-2 py-0.5 rounded-full shadow-sm">Dangmal</span>
                  <div className="w-3 h-3 bg-bhitarkanika-green rounded-full shadow-md border border-white"></div>
                </div>
              </div>

              {/* Decorative bouncing dots */}
              <div className="flex items-center justify-center text-bhitarkanika-olive">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-bhitarkanika-olive rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-bhitarkanika-olive rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-bhitarkanika-olive rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="grid gap-6 md:gap-8 md:grid-cols-2 md:items-start">
          {/* Calendar */}
          <div className="rounded-xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-black/5">
            <p className="mb-2 text-xs font-medium text-black/70">Select Date</p>
            <div className="mb-3 sm:mb-4 flex items-center justify-between">
              <button type="button" onClick={prevMonth} aria-label="Previous month" className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/10 text-sm text-black/60 hover:bg-black/5">
                <ArrowLeft size={16} />
              </button>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-black/80">{monthLabel}</p>
              <button type="button" onClick={nextMonth} aria-label="Next month" className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/10 text-sm text-black/60 hover:bg-black/5">
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-[11px] text-black/60">
              {WEEKDAYS.map((d) => (<div key={d} className="py-1">{d}</div>))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-sm">
              {monthMeta.cells.map((d, i) => {
                if (!d) return <div key={`e-${i}`} className="py-2" />;
                const ymd = formatYMD(d);
                const isToday = ymd === todayYMD;
                const dMid = new Date(d); dMid.setHours(0, 0, 0, 0);
                const isPast = dMid < todayMidnight;
                const isSelected = selectedYMD === ymd;
                const base = "rounded-xl py-1.5 sm:py-2 transition cursor-pointer";
                const state =
                  isSelected
                    ? "bg-[#d3e09b] font-semibold text-[#111111] shadow"
                    : isPast
                      ? "text-black/30 cursor-not-allowed"
                      : "hover:bg-black/5";
                return (
                  <button
                    key={ymd}
                    type="button"
                    onClick={() => !isPast && onSelectDay(d)}
                    disabled={isPast}
                    className={`${base} ${state} ${isToday && !isSelected ? "ring-1 ring-black/10" : ""}`}
                    aria-current={isSelected ? "date" : undefined}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slots + Guests */}
          <div className="space-y-6">
            <div role="radiogroup" aria-label="Select Slot">
              <p className="mb-3 text-sm font-semibold">Select Slot</p>
              <div className="space-y-3">
                <button
                  type="button"
                  role="radio"
                  aria-checked={slot === "first"}
                  onClick={() => setSlot("first")}
                  className={`w-full rounded-xl px-4 py-2 text-xs border transition ${slot === "first"
                    ? "bg-[#d3e09b] font-semibold text-[#111111] shadow border-transparent"
                    : "bg-gray-100 text-black/70 border-black/10 hover:bg-black/5"
                    }`}
                >
                  First Shift (7:00 am - 10:00 am)
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={slot === "second"}
                  onClick={() => setSlot("second")}
                  className={`w-full rounded-xl px-4 py-2 text-xs border transition ${slot === "second"
                    ? "bg-[#d3e09b] font-semibold text-[#111111] shadow border-transparent"
                    : "bg-gray-100 text-black/70 border-black/10 hover:bg-black/5"
                    }`}
                >
                  Second Shift (1:30 am - 4:30 am)
                </button>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">Number of Guests</p>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-[12px] text-black/70">Total Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="18"
                    value={guests.total}
                    onChange={(e) => {
                      const value = e.target.value;
                      setGuests((g) => ({ ...g, total: value }));
                      setShowCapacityWarning(parseInt(value) > 18);
                    }}
                    placeholder="Enter Number of Guests"
                    className={`w-full rounded-xl border px-3 py-2 text-sm shadow-sm placeholder:text-black/40 focus:outline-none focus:ring-2 ${showCapacityWarning
                      ? 'border-red-300 bg-red-50 focus:ring-red-500'
                      : 'border-black/10 bg-white focus:ring-black/10'
                      }`}
                  />
                  {showCapacityWarning && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-800 font-medium">
                        ❌ You have {guests.total} people, but maximum is 18 per boat
                      </p>
                      <p className="text-xs text-red-700 mt-1">
                        For {guests.total} people, you'll need to book multiple boats separately.
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-[12px] text-black/70">Total Number of Children (Under 3 year Old) *</label>
                  <input
                    type="number"
                    min="0"
                    value={guests.children}
                    onChange={(e) => setGuests((g) => ({ ...g, children: e.target.value }))}
                    placeholder="Enter Number of Children"
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="bg-bhitarkanika-green/5 rounded-xl p-4 border border-bhitarkanika-green/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-bhitarkanika-text">Boat Price</p>
                  <p className="text-xs text-gray-600">Entire boat booking</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-bhitarkanika-text">₹3,500</p>
                  <p className="text-xs text-gray-600">From Khola To Dangmal</p>
                </div>
              </div>
            </div>

            {/* Nav buttons: full-width on mobile */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#111111] bg-white px-4 py-2 text-sm font-medium text-[#111111] hover:bg-black/5"
              >
                <ArrowLeft size={16} />
                BACK
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                NEXT
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <ImportantInfoSection />
    </div >
  );
}
