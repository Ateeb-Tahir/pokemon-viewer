async function fetchData() {
  const nameInput = document.getElementById("pokemonName");
  const pokemonName = nameInput.value.trim().toLowerCase();

  const imgElement = document.getElementById("pokemonSprite");
  const errorMessage = document.getElementById("errorMessage");
  const nameDisplay = document.getElementById("pokemonNameDisplay");
  const spriteContainer = document.getElementById("spriteContainer");

  // Reset UI
  imgElement.style.display = "none";
  imgElement.src = "";
  errorMessage.textContent = "";
  nameDisplay.textContent = "";
  spriteContainer.style.display = "none";

  if (!pokemonName) {
    errorMessage.textContent = "Please enter a Pokémon name.";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error("Pokémon not found. Check the name and try again.");
    }

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;

    if (!pokemonSprite) {
      throw new Error("No sprite image available for this Pokémon.");
    }

    imgElement.src = pokemonSprite;
    imgElement.alt = pokemonName;
    imgElement.style.display = "block";

    nameDisplay.textContent = nameInput.value.trim(); // show exact input
    spriteContainer.style.display = "flex"; // show image + name block
  } catch (error) {
    errorMessage.textContent = error.message;
    console.error(error);
  }
}
