const addModal = document.querySelector(".add-modal");
const openModalButton = document.querySelector(".footer-btn");
const createButton = document.querySelector(".create-button");
const phoneInput = document.getElementById("add-phone");

const mask = () =>
{
	
	const maskOptions = {
		mask: '+{7} (000) 000-00-00',
		lazy: false,
	};

	IMask(phoneInput, maskOptions);
}

createButton.addEventListener("click", () => {
	const nameInput = document.getElementById("add-name");
	const phoneInput = document.getElementById("add-phone");
	const checkbox = document.getElementById("is-favorite");

	const handledPhoneNumber = phoneInput.value.replace(/\(|\)|\s|\_|\-/g, "");
	console.log(handledPhoneNumber);
	if (/(?:\+|\d)[\d\-\(\) ]{9,}\d/g.test(handledPhoneNumber) && nameInput.value !== "" && handledPhoneNumber.length === 12) {
		insertphoneItemIntophoneContainer(nameInput.value, phoneInput.value, checkbox.checked);
		document.body.classList.remove("modal-open");
		addModal.style.display = "none";
		checkbox.checked = false;
		nameInput.value = "";
		mask()
		deleteButtons();
		favourite();
		sortphoneItems(document.querySelectorAll(".phone-item"));
	}
});

openModalButton.addEventListener("click", () => {
	addModal.style.display = "flex";
	document.body.classList.add("modal-open");
	mask();
})

const insertphoneItemIntophoneContainer = (name, phoneNumber, isFavorite) => {
	const phoneItem = `
	<div class="phone-item">
		<div class="phone-item-logo">
			<img src="img/logotip.png" alt="">
		</div>
		<div class="phone__item-data">
			<div class="phone-item-name">
				${name}
			</div>
			<div class="phone-item-phone">
				${phoneNumber}
			</div>
		</div>

		<div class="phone-item-buttons">
			<button class="phone-item-delete">
				<img class="button-img" src="img/krestik.png" alt="">
			</button>
			<button class="phone-item-favourite">
				<img class="button-love" src="${isFavorite ? "img/heart.png" : "img/empty-heart.png"}" alt="empty">
			</button>
		</div>
</div>`;

	phoneContainer.insertAdjacentHTML("beforeend", phoneItem);
}

