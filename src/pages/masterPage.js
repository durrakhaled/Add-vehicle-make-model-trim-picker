// The code in this file will load on every page of your site

$w.onReady(function () {
	// Write your code here
});[
     
/***
* Code added by AI Assistant
* Prompt: I want it to have a dropdown of the years 1990-2025, and then based on that answer, to automatically customize the dropdown for the make in the second dropdown
***/
import wixData from "wix-data";

$w.onReady(() => {
  // Initialize the YearDropdown with years 1990-2025
  const years = Array.from({ length: 2025 - 1990 + 1 }, (v, k) => 1990 + k);
  const yearOptions = years.map(year => ({ label: year.toString(), value: year.toString() }));
  $w("#YearDropdown").options = yearOptions;

  // Set up the onClick event handler for YearDropdown
  $w("#YearDropdown").onClick(() => {
    const selectedYear = $w("#YearDropdown").value;
    if (selectedYear) {
      // Customize the second dropdown based on the selected year
      loadMakeOptions(selectedYear);
    }
  });
});

// Function to load make options based on the selected year
function loadMakeOptions(year) {
  // Example: Fetch makes from a collection based on the selected year
  wixData.query("CarMakes")
    .eq("year", year)
    .find()
    .then(results => {
      const makeOptions = results.items.map(item => ({ label: item.make, value: item.make }));
      $w("#MakeDropdown").options = makeOptions;
    })
    .catch(err => {
      console.error("Error fetching makes:", err);
    });
}


/***
* Code added by AI Assistant
* Prompt: The "make" dropdown should display a list of car manufacturers from 1990 to 2025, including: Toyota, Honda, Ford, Chevrolet, Nissan, BMW, Mercedes-Benz, Audi, Volkswagen, Hyundai, Kia, Subaru, Dodge, Jeep, Chrysler, Mazda, Infiniti, Acura, Porsche, Ferrari, Lamborghini, Cadillac, Lincoln, GMC, Tesla, and Mitsubishi. The list should populate automatically when the page loads. This should also depend on the avalibility of years of makes. For example, if Jeep doesnt have a 2000 car, and the user who clicked 2000 in the first "year" dropdown, then that option shouldn't be avaliable and so forth.
***/
import wixData from 'wix-data';

// Function to load car makes based on the selected year
async function loadCarMakes(selectedYear) {
    try {
        // Query the collection for car makes available in the selected year
        const results = await wixData.query("CarMakes")
            .eq("year", selectedYear)
            .find();

        // Build the options for the dropdown
        const carMakes = results.items.map(item => {
            return { label: item.make, value: item.make };
        });

        // Set the options for the MakeDropdown
        $w("#MakeDropdown").options = carMakes;
    } catch (error) {
        console.error("Error loading car makes:", error);
    }
}

// Example function to handle year selection and load makes
export function yearDropdown_change(event) {
    const selectedYear = event.target.value;
    loadCarMakes(selectedYear);
}
