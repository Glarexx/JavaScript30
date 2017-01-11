const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
    const suffix = this.dataset.sizing || ''; //apply nothing if no px sizing
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix); //added size in px to attribute
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));