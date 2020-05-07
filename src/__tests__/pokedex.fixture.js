export default `<div class="body">

<div class="arrow left-arrow">
    <img src="img/arrow.png" id="left-arrow" alt="Last Pokemon" data-url="">
</div>

<div class="container">
    <div class="image-holder">
        <img src="" class="pokemon-image" id="pokemon-front" data-backsrc="" alt="pokemon">
        <button id="button-reverse">
            <img src="img/refresh-arrow.svg" id="refresh-arrow" alt="">
        </button>
    </div>
    <div class="data">
        <h2 class="name"></h2>
        <div>Height: <span class="height"></span></div>
        <div>Weight: <span class="weight"></span></div>
        <label for="types">Types: </label>
        <div class="types" name="types"></div>
        <div class="stats">
            <button id="toggle-visibility">Toggle text/chart</button>
            <div id="text-stats">
                <h3>Stats</h3>
                <div>HP: <span class="hp"></span></div>
                <div>Attack: <span class="attack"></span></div>
                <div>Defense: <span class="defense"></span></div>
                <div>Speed: <span class="speed"></span></div>
                <div>Special attack: <span class="special-attack"></span></div>
                <div>Special defense: <span class="special-defense"></span></div>
            </div>
            <div id="canvas" class="toggleVisibility">
                <canvas id="myChart" width="200" height="200"></canvas>
            </div>
        </div>
    </div>
</div>

<div class="arrow right-arrow">
    <img src="img/arrow.png" id="right-arrow" alt="Next Pokemon" data-url="">
</div>

</div>`
