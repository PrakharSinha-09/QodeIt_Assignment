import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const WebpageWritingComponent = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    

    const [topTierSelected, setTopTierSelected] = useState(null);
    const [midTierSelected, setMidTierSelected] = useState(null);
    const [quantityValue, setQuantityValue] = useState(1);

    const [isWordsClicked, setIsWordsClicked] = useState(false);

  
    const topTierButtons = ['Academic Writing', 'Editing and Proofreading', 'Calculations'];
    const midTierButtons = ['High School', 'Undergraduate', 'Bachelor', 'Professional'];
  
    const handleTopTierClick = (option) => {
      setTopTierSelected(option);
    };
  
    const handleMidTierClick = (option) => {
      setMidTierSelected(option);
    };
  
    const handleQuantityChange = (e) => {
      setQuantityValue(Number(e.target.value));
    };

    const handleWordsButtonClick = () => {
      setIsWordsClicked(true);
    };
    
    const handlePagesButtonClick = () => {
      setIsWordsClicked(false);
    };

    const calculateApproxPrice = () => {
        const prices = {
            'Academic Writing_High School': 12,
            'Academic Writing_Undergraduate': 15,
            'Academic Writing_Bachelor': 21,
            'Academic Writing_Professional': 25,
            'Editing and Proofreading_High School': 3,
            'Editing and Proofreading_Undergraduate': 5,
            'Editing and Proofreading_Bachelor': 7,
            'Editing and Proofreading_Professional': 13,
            'Calculations_High School': 18,
            'Calculations_Undergraduate': 23,
            'Calculations_Bachelor': 32,
            'Calculations_Professional': 38,
          };
    
          const key = `${topTierSelected}_${midTierSelected}`;
          const price = prices[key] || 0;
      
          return (price * quantityValue);
    }

    // Calculate words based on the quantity (assuming 275 words per page)
  function calculateWords(){
    return 275*quantityValue
  }

  
  return (
    <div className="calculator">
      {/* Top Tier Buttons */}
       <div id="top-tier" className="tier">
        {topTierButtons.map((option, index) => (
          <div
            key={index}
            data-id={index}
            className={`btn-tier ${topTierSelected === option ? 'highlight' : ''}`}
            onClick={() => handleTopTierClick(option)}
          >
            <p>{option}</p>
          </div>
        ))}
      </div>

      {/* Second Tier Buttons */}
      <div id="mid-tier" className="tier">
        {midTierButtons.map((option, index) => (
          <div
            key={index}
            data-id={index}
            className={`btn-tier ${midTierSelected === option ? 'highlight' : ''}`}
            onClick={() => handleMidTierClick(option)}
          >
            <p>{option}</p>
          </div>
        ))}
      </div>

      {/*Type Of Paper */}
      <div className="type-of-paper">
        <p>Type of Paper</p>
        <label>
          <div className="select-box">
            <select>
              <option value="" disabled selected>
                Select...
              </option>
              <option value="research-paper">Research Paper</option>
              <option value="research-proposal">Research Proposal</option>
              <option value="speech">Speech</option>
              <option value="thesis">Thesis</option>
              <option value="thesis-proposal">Thesis Proposal</option>
              <option value="thesis-statement">Thesis Statement</option>
            </select>
          </div>
        </label>
      </div>

       {/* Quantity */}
       <div className="quantity-c">
        <div>
          <p className='qt'>Quantity</p>
          <div className="quantity">
            <label>
            <input
                type="number"
                className="quantity-input"
                defaultValue={quantityValue}
                value={isWordsClicked ? calculateWords() : quantityValue}
                min="1"
                onChange={handleQuantityChange}  
                disabled={isWordsClicked}
                />          
            </label>
          </div>

          <div className="buttons">
          <button
          className={`page-button ${!isWordsClicked ? 'highlight' : ''}`}
          onClick={handlePagesButtonClick}
          >Pages</button>
            <button
          className={`word-button ${isWordsClicked ? 'highlight' : ''}`}
          onClick={handleWordsButtonClick}
        >
          Words
        </button>
          </div>
        </div>
      </div>

      {/* Deadline */}
      <div className="calen-c">
        <p>Deadline</p>
        <div className="calen">
          <label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              customInput={<CustomDateInput />}
              calendarClassName='custom-calendar'
            />
          </label>
        </div>
      </div>

      {/* Checkout */}
      <div className="checkout">
        <div className="price-main">
          <p>Approx. Price</p>
          <div className="price">
            <h2>${calculateApproxPrice()}</h2>
          </div>
        </div>
        <div className="order-btn">
          <button>PROCEED TO ORDER</button>
        </div>
      </div>
    </div>
  );
};

const CustomDateInput = ({ value, onClick }) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      className="custom-datepicker deadline-input" // Apply custom class
    />
  );

export default WebpageWritingComponent;
