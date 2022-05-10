function getDaftarSurat(){
    fetch('https://equran.id/api/surat')
        .then(response => response.json())
        .then(response => {
            let cardSurat = '';
            response.forEach( surat => {
                cardSurat += `
                <div class="col-lg-3 col-md-4 col-sm-12 mb-4">
                        <div class="card card-surat" onclick="location.href='surat.html?nomorsurat=${surat.nomor}'">
                            <div class="card-body">
                            <h6 class="card-title">${surat.nomor}.${surat.nama_latin}</h6>
                            <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                            <p class="card-text text-end">${surat.arti}</p>
                            </div>
                        </div>
                </div>`;

                const getCardSurat = document.querySelector('.card-quran');
                getCardSurat.innerHTML = cardSurat;
            });
        } );
}


getDaftarSurat();