// ===== INTERFACE =====

function showError(inputElement, message) {

    if (!inputElement) return;

    inputElement.classList.add("input-error");
    inputElement.value = "";
    inputElement.placeholder = message;
}

function clearErrors(elementos) {

    for (let key in elementos) {

        const el = elementos[key];

        if (el && el.classList) {
            el.classList.remove("input-error");
        }
    }
}

// menu
function initMenu() {

    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");

    if (!menuBtn || !menu) return;

    menuBtn.addEventListener("click", () => {

        menu.style.display =
            menu.style.display === "block" ? "none" : "block";

    });
}

// inputs monetários
function initCurrencyInputs(elementos) {

    const ids = ["rendaMensal", "valordeAvaliacao", "valordeVenda"];

    ids.forEach((key) => {

        const el = elementos[key];
        if (!el) return;

        el.addEventListener("input", () => {

            const start = el.selectionStart;
            const oldValue = el.value;

            el.value = formatarMoeda(oldValue);

            const diff = el.value.length - oldValue.length;

            el.selectionStart = el.selectionEnd = start + diff;

        });

        el.addEventListener("blur", () => {

            if (el.value !== "") {
                el.value = formatarMoeda(el.value);
            }

        });

    });
}