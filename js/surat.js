function getURL(e){
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split('&');
    for(let i = 0; i < urlVariable.length; i++){
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e ){
            return parameterName[1];
        }
    }
}

const nomorSurat = getURL('nomorsurat');

function getDetailSurat(){

    fetch(`https://equran.id/api/surat/${nomorSurat}`)
        .then(response => response.json())
        .then(response => {
            const surat = response.ayat;

            // Detail Surat
            const detailSurat = `
            <div class="card-body">
                <h5 class="card-title">${response.nama_latin} - ${response.nama}</h5>
                <p class="card-text">Jumlah Ayat: ${response.jumlah_ayat} (${response.arti})</p>
                <button class="btn btn-primary btn-audio-play">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-play-fill" viewBox="0 0 16 16">
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z"/>
                    </svg> Dengarkan
                </button>
                <button class="btn btn-secondary audio-tag btn-audio-pause">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"/>
                    </svg> Stop
                </button>
            </div>
            <audio class="play-audio" src="${response.audio}"></audio>
            `;
            const cardDetailSurat = document.querySelector('.card-detail-surat');
            cardDetailSurat.innerHTML = detailSurat;
            
            // Play Audio
            const btnAudioPlay = document.querySelector('.btn-audio-play');
            const btnAudioPause = document.querySelector('.btn-audio-pause');
            const playAudio = document.querySelector('.play-audio');
            btnAudioPlay.addEventListener('click', function(){
                btnAudioPlay.classList.add('audio-tag');
                btnAudioPause.classList.remove('audio-tag');
                playAudio.play();
            });

            // puase Audio
            btnAudioPause.addEventListener('click', function(){
                btnAudioPlay.classList.remove('audio-tag');
                btnAudioPause.classList.add('audio-tag');
                playAudio.pause();
            });


            // Isi Surat
            let isiSurat = '';
            surat.forEach( s => {
                isiSurat += `
                <div class="card mb-3">
                    <div class="card-body">
                        <div>${s.nomor}</div>
                        <div><h4 class="text-end mb-3 " >${s.ar}</h4></div>
                        <div class="mb-2">${s.tr}</div>
                        <div>${s.idn}</div>
                    </div>
                </div>
                `;
            });

            const cardIsiSurat = document.querySelector('.card-isi-surat');
            cardIsiSurat.innerHTML = isiSurat;
            console.log(response);
        });

}

getDetailSurat();
