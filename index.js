const searchInput = document.querySelector(".top-input");
const phoneContainer = document.querySelector(".phone-content");


const sortphoneItems = items => {
	const hiddenItems = [...items].filter(item => window.getComputedStyle(item).display === "none");

	const visibleItems = [...items].filter(item => window.getComputedStyle(item).display === "flex");

	const favoriteItems = visibleItems.filter(item => {
		const heart = item.querySelector(".button-love");
		return heart.getAttribute("src") === "img/heart.png";
	})

	const commonItems = visibleItems.filter(item => {
		const heart = item.querySelector(".button-love");
		return heart.getAttribute("src") === "img/empty-heart.png";
	});

	const sortedItems = [
		...favoriteItems,
		...commonItems.sort((a, b) => {
			const first = a.querySelector(".phone__item-name").innerHTML.replace(/^\s+|\s+$/g, "");
			const second = b.querySelector(".phone__item-name").innerHTML.replace(/^\s+|\s+$/g, "");
			if (first.attr < second.attr)
				return -1;
			if (first.attr > second.attr)
				return 1;
			return 0;
		}),
		...hiddenItems
	];
	phoneContainer.replaceChildren(...sortedItems);
}
sortphoneItems(document.querySelectorAll(".phone__item"));


const favourite = () => {
	const favoriteButtons = phoneContainer.querySelectorAll(".button-love");
	favoriteButtons.forEach(btn => {
		btn.onclick = null;
		btn.onclick = () => {
			const photo = btn.getAttribute("src");
			if (photo.includes("empty-heart")) {
				btn.setAttribute("src", "img/heart.png");
				sortphoneItems(document.querySelectorAll(".phone-item"));
			}

			if (photo == "img/heart.png") {
				btn.setAttribute("src", "img/empty-heart.png");
				sortphoneItems(document.querySelectorAll(".phone-item"));
			}
		}
	})
}


const deleteButtons = () => {
	const deleteButtons = phoneContainer.querySelectorAll(".phone-item-delete");
	deleteButtons.forEach(btn => {
		btn.onclick = null;
		btn.onclick = () => {
			const deleteItem = btn.closest(".phone-item");
			deleteItem.onclick = null;
			deleteItem.remove();
			listenRemoveButtons();
			sortphoneItems(document.querySelectorAll(".phone-item"));
		}
	})
};

favourite();
deleteButtons();


searchInput.addEventListener("input", (e) => {
	const searchValue = e.target.value;
	const items = document.querySelectorAll(".phone__item");
	items.forEach(item => {
		const name = item.querySelector(".phone__item-name").innerHTML.replace(/^\s+|\s+$/g, "");
		if (!name.toLowerCase().includes(searchValue.toLowerCase())) {
			item.style.display = "none";
		}
		else {
			item.style.display = "flex";
		}
	});
	sortphoneItems(items);
})