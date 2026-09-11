document.addEventListener('DOMContentLoaded', function () {

    // ---- STATO LINGUA (default: inglese) ----
    let currentLang = 'en';

    // ---- RIFERIMENTI DOM ----
    const btnLang = document.getElementById('lang-toggle');
    const contentIt = document.getElementById('content-it');
    const contentEn = document.getElementById('content-en');
    const modal = document.getElementById('app-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');

    // ---- DATI BILINGUE DELLE APPLICAZIONI (DETTAGLI + GALLERIA) ----
    // ITALIANO E INGLESE USANO LE STESSE IMMAGINI (PERCORSI IDENTICI)
    const appData = {
        it: {
            mofi: {
                title: 'Mofi',
                badge: 'Python',
                images: [
                    'assets/img/mofi/mofi-1.png',
                    'assets/img/mofi/mofi-2.png',
                    'assets/img/mofi/mofi-3.png',
                    'assets/img/mofi/mofi-4.png',
                    'assets/img/mofi/mofi-5.png'
                ],
                description: `
                    <p>L'applicazione permette di ottenere il diagramma momento curvatura di una sezione di cui si può specificare la geometria, armatura e parametri meccanici. Il calcolo del momento corrispondente alle diverse curvature viene effettuato sfruttando il <strong>Metodo a Fibre</strong>.</p>
                    <p>Viene inoltre calcolato ed evidenziato nel grafico il momento di fessurazione e quello di snervamento, corrispondenti rispettivamente al raggiungimento della massima tensione di trazione al lembo inferiore della sezione e allo snervamento delle armature tese.</p>
                    <p>Si possono condurre molteplici analisi in modo da confrontare i risultati al variare di particolari parametri. I grafici ottenuti possono essere salvati e le tabelle con i valori possono essere esportate e salvate in Excel.</p>
                    <p>I valori di rotazione di corda notevoli sono ricavati sfruttando le formulazioni dell'Eurocodice specializzate al caso di edifici esistenti, visualizzabili nella sezione informazioni, i cui parametri possono essere modificati.</p>
                    <p>A partire dalla versione 1.2 è possibile tenere conto anche delle sollecitazioni di sforzo normale e quindi tracciare il diagramma nel caso di pilastri. Inoltre si tiene conto nel legame momento curvatura della resistenza a trazione del calcestruzzo.</p>
                    <p>L'applicazione è interamente sviluppata in <strong>Python</strong>, può essere scaricata e utilizzata su qualsiasi computer con sistema operativo Windows. È disponibile anche la lingua inglese, da cambiare direttamente all'interno dell'interfaccia.</p>
                    <p>L'applicazione prevede due file di esempio, relativo ad una trave e ad un pilastro, che possono essere selezionati all'interno del Menu principale.</p>
                    <p><em>Schermate versione 1.0 · 1.1 · 1.2</em></p>
                `
            },
            lisa: {
                title: 'LiSa',
                badge: 'Python',
                images: [
                    'assets/img/lisa/Lisa-1.png',
                    'assets/img/lisa/Lisa-2.png',
                    'assets/img/lisa/Lisa-3.png',
                    'assets/img/lisa/Lisa-4.png'
                ],
                description: `
                    <p>L'applicazione permette di ricavare le <strong>linee di influenza</strong> di una sezione aperta con geometria e numero di nervature definito.</p>
                    <p>Dopo aver inserito le caratteristiche geometriche dell'impalcato e la posizione della sezione di calcolo si possono ricavare le linee di influenza dei coefficienti di ripartizione, taglio e momento flettente.</p>
                    <p>Le linee di influenza sono ricavate assumendo che la sezione sia infinitamente rigida e facendo riferimento alla <strong>teoria di Engesser</strong>, quindi considerando solo la torsione secondaria.</p>
                    <p>Le tabelle contenenti i risultati possono essere esportate e salvate in Excel ed inoltre si possono salvare le linee di influenza rappresentate in formato AutoCAD.</p>
                    <p>L'applicazione è interamente sviluppata in <strong>Python</strong>, può essere scaricata e utilizzata su qualsiasi computer con sistema operativo Windows. Sono disponibili due file di esempio direttamente integrati nell'applicazione.</p>
                `
            },
            palib: {
                title: 'PaLib',
                badge: 'Python',
                images: [
                    'assets/img/palib/palib-1.png',
                    'assets/img/palib/palib-2.png',
                    'assets/img/palib/palib-3.png'
                ],
                description: `
                    <p>L'applicazione permette di ricavare la <strong>profondità di infissione</strong> strettamente necessaria per una paratia libera.</p>
                    <p>È necessario definire le caratteristiche meccaniche e di permeabilità del terreno, compreso il coefficiente di spinta passivo e attivo e l'altezza di ritenuta.</p>
                    <p>Si può definire la posizione della falda e la presenza di un eventuale strato impermeabile al fondo in cui si attesta la paratia.</p>
                    <p>Una volta calcolata la profondità di infissione si può rappresentare il diagramma di interazione.</p>
                    <p>L'applicazione è interamente sviluppata in <strong>Python</strong>, può essere scaricata e utilizzata su qualsiasi computer con sistema operativo Windows. È disponibile un file di esempio direttamente integrato nell'applicazione.</p>
                `
            },
            pavin: {
                title: 'PaVin',
                badge: 'Python',
                images: [
                    'assets/img/pavin/pavin-1.png'
                ],
                description: `
                    <p>L'applicazione permette di ricavare la <strong>profondità di infissione</strong> strettamente necessaria per una paratia vincolata in testa.</p>
                    <p>È necessario definire le caratteristiche meccaniche e di permeabilità del terreno, compreso il coefficiente di spinta passivo e attivo. Infine, si deve definire l'altezza di ritenuta e la posizione del vincolo.</p>
                    <p>Una volta calcolata la profondità di infissione si può rappresentare il diagramma di interazione.</p>
                    <p>L'applicazione è interamente sviluppata in <strong>Python</strong>, può essere scaricata e utilizzata su qualsiasi computer con sistema operativo Windows. Sono disponibili due file di esempio direttamente integrati nell'applicazione.</p>
                `
            },
            tevi: {
                title: 'TeVi',
                badge: 'Python',
                images: [
                    'assets/img/tevi/tevi-1.png',
                    'assets/img/tevi/tevi-2.png'
                ],
                description: `
                    <p>L'applicazione permette di ricavare le <strong>informazioni modali</strong> di una semplice struttura a due piani schematizzata come Grinter.</p>
                    <p>Si può ricavare la pulsazione modale, il periodo, la forma modale, il fattore di partecipazione e la massa partecipante dei due modi di vibrare della struttura.</p>
                    <p>Inoltre, i modi di vibrare ricavati possono essere visualizzati.</p>
                    <p>L'applicazione è interamente sviluppata in <strong>Python</strong>, può essere scaricata e utilizzata su qualsiasi computer con sistema operativo Windows. È disponibile un file di esempio direttamente integrato nell'applicazione.</p>
                `
            },
            barros: {
                title: 'Barros',
                badge: 'Python',
                images: [
                    'assets/img/barros/barros-1.png'
                ],
                description: `
                    <p>L'applicazione permette di applicare la <strong>teoria di Barros</strong> ad un terrapieno retrostante ad un opera di sostegno.</p>
                    <p>A partire dalle caratteristiche meccaniche e geometriche del terrapieno si può valutare la spinta agente sul muro di sostegno e la portata effluente attraverso un eventuale sistema di drenaggio, che può essere dimensionato sfruttando i risultati ottenuti.</p>
                    <p>Dalla teoria di Barros si ricava anche il valore dell'angolo di inclinazione della superficie di scorrimento rispetto l'orizzontale.</p>
                    <p>L'applicazione è interamente sviluppata in <strong>Python</strong>, può essere scaricata e utilizzata su qualsiasi computer con sistema operativo Windows. È disponibile un file di esempio direttamente integrato nell'applicazione.</p>
                `
            },
            sismici: {
                title: 'Analisi segnali sismici',
                badge: 'Matlab',
                images: [
                    'assets/img/ass/ass-1.png'
                ],
                description: `
                    <p>L'applicazione permette di scaricare, direttamente dal portale Itaca, un segnale sismico ed analizzarlo.</p>
                    <p>A partire dal segnale sismico in termini di accelerazione si ottiene il segnale in termini di velocità e spostamento. I segnali sono rappresentati e di essi sono individuate le misure di intensità di picco (<strong>PGA, PGV e PGD</strong>).</p>
                    <p>Inoltre l'applicazione permette di individuare la durata significativa e la bracketed duration del segnale, considerando come soglia per quest'ultima un accelerazione di 0.05g (che può essere modificata).</p>
                    <p>Infine, permette di individuare l'<strong>Intensità di Arias</strong> e l'<strong>Husid Plot</strong> del segnale.</p>
                    <p>L'applicazione è interamente sviluppata in <strong>Matlab</strong>, può essere scaricata e utilizzata su qualsiasi computer con sistema operativo Windows.</p>
                `
            },
            pericolosita: {
                title: 'Analisi Pericolosità',
                badge: 'Matlab',
                images: [
                    'assets/img/ap/ap-1.jpg',
                    'assets/img/ap/ap-2.jpg',
                    'assets/img/ap/ap-3.jpg',
                    'assets/img/ap/ap-4.jpg',
                    'assets/img/ap/ap-5.jpg',
                    'assets/img/ap/ap-6.jpg'
                ],
                description: `
                    <p>L'applicazione permette di realizzare la <strong>curva di pericolosità</strong> e la <strong>disaggregazione della pericolosità</strong> data una sorgente elementare lineare di cui si possono specificare le caratteristiche geometriche e di occorrenza dei terremoti.</p>
                    <p>Per la distribuzione delle magnitudo si considera la <strong>legge di Gutenberg – Richter</strong>, di cui si possono definire i parametri. Si sfrutta inoltre una generica legge di attenuazione di cui si possono inserire i parametri.</p>
                    <p>Come misura d'intensità si può scegliere la PGV oppure la PGA e definire le relative soglie.</p>
                    <p>Inoltre, attraverso l'applicazione si può eseguire la disaggregazione della pericolosità sismica, individuando il contribuito dello scenario più rilevante al superamento di una certa soglia di intensità.</p>
                    <p>L'applicazione comprende due file di esempio ai quali si può accedere cliccando con il tasto destro in qualsiasi punto dell'interfaccia.</p>
                `
            },
            spettri: {
                title: 'Spettri di risposta e spettri-pseudo',
                badge: 'Matlab',
                images: [
                    'assets/img/rs/rs-1.jpg',
                    'assets/img/rs/rs-2.jpg',
                    'assets/img/rs/rs-3.jpg',
                    'assets/img/rs/rs-4.jpg',
                    'assets/img/rs/rs-5.jpg'
                ],
                description: `
                    <p>L'applicazione permette di realizzare gli <strong>spettri di risposta</strong> e gli <strong>spettri-pseudo</strong> a partire dal segnale sismico in termini di accelerazione, scaricabile dal portale Itaca.</p>
                    <p>L'estensione del file deve essere ".txt", quindi è necessario semplicemente rinominare il file. Selezionato il segnale all'interno dell'applicazione, è necessario definire la massa dell'oscillatore semplice e l'intervallo dei periodi da analizzare, specificando il numero di periodi.</p>
                    <p>Si possono inserire molteplici valori del fattore di smorzamento dell'oscillatore ed eseguire altrettante analisi, spuntando le relative caselle.</p>
                    <p>L'equazione del moto per ogni oscillatore viene risolta con il <strong>metodo di Newmark</strong>, ricavando la risposta del sistema in termini di spostamento, velocità ed accelerazione.</p>
                    <p>A partire dai risultati si individuano le ordinate spettrali, <strong>PSA e PSV</strong>, necessarie per elaborare gli spettri di risposta e spettri-pseudo.</p>
                `
            },
            nodi: {
                title: 'Verifica nodi e calcolo armature',
                badge: 'Matlab',
                images: [
                    'assets/img/nodi/nodi-1.png',
                    'assets/img/nodi/nodi-2.png',
                    'assets/img/nodi/nodi-3.png',
                    'assets/img/nodi/nodi-4.png'
                ],
                description: `
                    <p>L'applicazione permette di eseguire la <strong>verifica dei nodi</strong> a taglio-trazione e taglio-compressione e la progettazione delle staffe.</p>
                    <p>La verifica tensionale può essere condotta dopo aver definito le caratteristiche geometriche e meccaniche del pannello nodale e le sollecitazioni, di sforzo normale e taglio, che agiscono su di esso.</p>
                    <p>Si confrontano le tensioni principali di trazione e compressione con le tensioni limite del materiale.</p>
                    <p>Ulteriormente, tenendo conto dei meccanismi pre-fessurazione e post-fessurazione, con riferimento alla formula dell'<strong>Eurocodice 8</strong>, si può individuare il quantitativo minimo di armatura trasversale da garantire all'interno del pannello nodale.</p>
                    <p>L'applicazione comprende due file di esempio ai quali si può accedere cliccando con il tasto destro in qualsiasi punto dell'interfaccia.</p>
                `
            },
            uhs: {
                title: 'Spettro Pericolosità uniforme',
                badge: 'Matlab',
                images: [
                    'assets/img/spu/spu-1.jpg',
                    'assets/img/spu/spu-2.jpg',
                    'assets/img/spu/spu-3.jpg',
                    'assets/img/spu/spu-4.jpg',
                    'assets/img/spu/spu-5.jpg'
                ],
                description: `
                    <p>L'applicazione permette di realizzare lo <strong>spettro a pericolosità uniforme</strong> e di effettuare la disaggregazione della pericolosità.</p>
                    <p>Lo spettro è ricavato per una zona sismogenetica lineare di cui si possono definire le caratteristiche geometriche e il tasso di occorrenza dei terremoti.</p>
                    <p>Per la distribuzione delle magnitudo si considera la <strong>legge di Gutenberg – Richter</strong>, di cui si possono definire i parametri.</p>
                    <p>Si sfruttano cinque diverse leggi di attenuazione, per fissati periodi dell'oscillatore, di cui si possono specificare i parametri per calcolare le probabilità condizionate presenti nell'integrale di pericolosità, considerando la pseudo-accelerazione spettrale come misura d'intensità.</p>
                    <p>Si elaborano quindi le cinque diverse curve di pericolosità e, definendo il periodo di ritorno, si calcola lo spettro a pericolosità uniforme.</p>
                    <p>L'applicazione comprende un file di esempio al quale si può accedere cliccando con il tasto destro in qualsiasi punto dell'interfaccia.</p>
                `
            },
            grinter: {
                title: 'Analisi modale di telaio grinter a due piani',
                badge: 'Matlab',
                images: [
                    'assets/img/grinter/grinter-1.jpg'
                ],
                description: `
                    <p>L'applicazione permette di eseguire l'<strong>analisi modale</strong> di una semplice struttura grinter a due piani.</p>
                    <p>La rigidezza dei pilastri costituenti i telai può essere calcolata attraverso l'applicazione oppure inserita direttamente.</p>
                    <p>Si ricava il periodo e la pulsazione modale dei due modi di vibrare della struttura.</p>
                    <p>Inoltre si possono ottenere le forme modali, il fattore di partecipazione modale e le masse partecipanti.</p>
                `
            }
        },
        en: {
            mofi: {
                title: 'Mofi',
                badge: 'Python',
                images: [
                    'assets/img/mofi/mofi-1.png',
                    'assets/img/mofi/mofi-2.png',
                    'assets/img/mofi/mofi-3.png',
                    'assets/img/mofi/mofi-4.png',
                    'assets/img/mofi/mofi-5.png'
                ],
                description: `
                    <p>This application allows you to obtain the moment‑curvature diagram of a cross‑section, where you can specify geometry, reinforcement, and mechanical parameters. The calculation of the moment corresponding to different curvatures is performed using the <strong>Fiber Method</strong>.</p>
                    <p>The cracking moment and yielding moment are also calculated and highlighted on the graph, corresponding respectively to the attainment of the maximum tensile stress at the bottom edge of the section and the yielding of the tensile reinforcement.</p>
                    <p>Multiple analyses can be conducted to compare results as certain parameters vary. The graphs can be saved and the value tables can be exported and saved in Excel.</p>
                    <p>Notable chord rotation values are derived using Eurocode formulations specifically for existing buildings, visible in the information section, whose parameters can be modified.</p>
                    <p>From version 1.2, it is possible to also account for normal force stresses and thus plot the diagram for columns. Moreover, the tensile strength of concrete is considered in the moment‑curvature relationship.</p>
                    <p>The application is entirely developed in <strong>Python</strong>, can be downloaded and used on any Windows computer. An English language option is also available, changeable directly within the interface.</p>
                    <p>The application includes two example files, for a beam and a column, which can be selected from the main menu.</p>
                    <p><em>Screenshots version 1.0 · 1.1 · 1.2</em></p>
                `
            },
            lisa: {
                title: 'LiSa',
                badge: 'Python',
                images: [
                    'assets/img/lisa/Lisa-1.png',
                    'assets/img/lisa/Lisa-2.png',
                    'assets/img/lisa/Lisa-3.png',
                    'assets/img/lisa/Lisa-4.png'
                ],
                description: `
                    <p>This application allows you to derive the <strong>influence lines</strong> of an open cross‑section with a defined geometry and number of ribs.</p>
                    <p>After entering the geometric characteristics of the deck and the position of the calculation section, the influence lines of the distribution coefficients, shear, and bending moment can be obtained.</p>
                    <p>The influence lines are derived assuming the section is infinitely rigid and referring to <strong>Engesser's theory</strong>, thus considering only secondary torsion.</p>
                    <p>The result tables can be exported and saved in Excel, and the represented influence lines can be saved in AutoCAD format.</p>
                    <p>The application is entirely developed in <strong>Python</strong>, can be downloaded and used on any Windows computer. Two example files are directly integrated into the application.</p>
                `
            },
            palib: {
                title: 'PaLib',
                badge: 'Python',
                images: [
                    'assets/img/palib/palib-1.png',
                    'assets/img/palib/palib-2.png',
                    'assets/img/palib/palib-3.png'
                ],
                description: `
                    <p>This application allows you to calculate the strictly necessary <strong>embedment depth</strong> for a free sheet pile wall.</p>
                    <p>It is necessary to define the mechanical and permeability characteristics of the soil, including the passive and active earth pressure coefficients and the retention height.</p>
                    <p>The position of the water table and the presence of a possible impermeable bottom layer where the wall is embedded can be defined.</p>
                    <p>Once the embedment depth is calculated, the interaction diagram can be plotted.</p>
                    <p>The application is entirely developed in <strong>Python</strong>, can be downloaded and used on any Windows computer. An example file is directly integrated into the application.</p>
                `
            },
            pavin: {
                title: 'PaVin',
                badge: 'Python',
                images: [
                    'assets/img/pavin/pavin-1.png'
                ],
                description: `
                    <p>This application allows you to calculate the strictly necessary <strong>embedment depth</strong> for a sheet pile wall restrained at the top.</p>
                    <p>It is necessary to define the mechanical and permeability characteristics of the soil, including the passive and active earth pressure coefficients. Finally, the retention height and the position of the restraint must be defined.</p>
                    <p>Once the embedment depth is calculated, the interaction diagram can be plotted.</p>
                    <p>The application is entirely developed in <strong>Python</strong>, can be downloaded and used on any Windows computer. Two example files are directly integrated into the application.</p>
                `
            },
            tevi: {
                title: 'TeVi',
                badge: 'Python',
                images: [
                    'assets/img/tevi/tevi-1.png',
                    'assets/img/tevi/tevi-2.png'
                ],
                description: `
                    <p>This application allows you to derive the <strong>modal information</strong> of a simple two‑storey structure modelled as a Grinter frame.</p>
                    <p>The modal pulsation, period, mode shape, participation factor, and participating mass of the two vibration modes can be obtained.</p>
                    <p>Moreover, the obtained mode shapes can be visualised.</p>
                    <p>The application is entirely developed in <strong>Python</strong>, can be downloaded and used on any Windows computer. An example file is directly integrated into the application.</p>
                `
            },
            barros: {
                title: 'Barros',
                badge: 'Python',
                images: [
                    'assets/img/barros/barros-1.png'
                ],
                description: `
                    <p>This application allows you to apply <strong>Barros' theory</strong> to an embankment behind a retaining structure.</p>
                    <p>Starting from the mechanical and geometric characteristics of the embankment, the thrust acting on the retaining wall and the outflow through a possible drainage system can be evaluated, which can be sized using the obtained results.</p>
                    <p>Barros' theory also provides the value of the inclination angle of the sliding surface with respect to the horizontal.</p>
                    <p>The application is entirely developed in <strong>Python</strong>, can be downloaded and used on any Windows computer. An example file is directly integrated into the application.</p>
                `
            },
            sismici: {
                title: 'Seismic signal analysis',
                badge: 'Matlab',
                images: [
                    'assets/img/ass/ass-1.png'
                ],
                description: `
                    <p>This application allows you to download a seismic signal directly from the Itaca portal and analyse it.</p>
                    <p>Starting from the seismic signal in terms of acceleration, the signal in terms of velocity and displacement is obtained. The signals are plotted and the peak intensity measures (<strong>PGA, PGV and PGD</strong>) are identified.</p>
                    <p>In addition, the application allows you to identify the significant duration and the bracketed duration of the signal, considering a threshold of 0.05g for the latter (which can be modified).</p>
                    <p>Finally, it allows you to identify the <strong>Arias Intensity</strong> and the <strong>Husid Plot</strong> of the signal.</p>
                    <p>The application is entirely developed in <strong>Matlab</strong>, can be downloaded and used on any Windows computer.</p>
                `
            },
            pericolosita: {
                title: 'Hazard analysis',
                badge: 'Matlab',
                images: [
                    'assets/img/ap/ap-1.jpg',
                    'assets/img/ap/ap-2.jpg',
                    'assets/img/ap/ap-3.jpg',
                    'assets/img/ap/ap-4.jpg',
                    'assets/img/ap/ap-5.jpg',
                    'assets/img/ap/ap-6.jpg'
                ],
                description: `
                    <p>This application allows you to generate the <strong>hazard curve</strong> and the <strong>disaggregation of the hazard</strong> given a linear elementary source whose geometric and earthquake occurrence characteristics can be specified.</p>
                    <p>For the magnitude distribution, the <strong>Gutenberg–Richter law</strong> is considered, whose parameters can be defined. A generic attenuation law is also used, whose parameters can be entered.</p>
                    <p>As an intensity measure, PGV or PGA can be chosen and the relevant thresholds can be defined.</p>
                    <p>Furthermore, through the application, it is possible to perform the disaggregation of seismic hazard, identifying the contribution of the most relevant scenario to the exceedance of a certain intensity threshold.</p>
                    <p>The application includes two example files that can be accessed by right‑clicking anywhere on the interface.</p>
                `
            },
            spettri: {
                title: 'Response spectra and pseudo‑spectra',
                badge: 'Matlab',
                images: [
                    'assets/img/rs/rs-1.jpg',
                    'assets/img/rs/rs-2.jpg',
                    'assets/img/rs/rs-3.jpg',
                    'assets/img/rs/rs-4.jpg',
                    'assets/img/rs/rs-5.jpg'
                ],
                description: `
                    <p>This application allows you to generate <strong>response spectra</strong> and <strong>pseudo‑spectra</strong> from the seismic signal in terms of acceleration, downloadable from the Itaca portal.</p>
                    <p>The file extension must be ".txt", so it is simply necessary to rename the file. Once the signal is selected within the application, it is necessary to define the mass of the simple oscillator and the period interval to be analysed, specifying the number of periods.</p>
                    <p>Multiple damping factor values can be entered and as many analyses can be performed by checking the corresponding boxes.</p>
                    <p>The equation of motion for each oscillator is solved using the <strong>Newmark method</strong>, obtaining the system response in terms of displacement, velocity, and acceleration.</p>
                    <p>From the results, the spectral ordinates <strong>PSA and PSV</strong> are identified, necessary to elaborate the response spectra and pseudo‑spectra.</p>
                `
            },
            nodi: {
                title: 'Joint verification and reinforcement design',
                badge: 'Matlab',
                images: [
                    'assets/img/nodi/nodi-1.png',
                    'assets/img/nodi/nodi-2.png',
                    'assets/img/nodi/nodi-3.png',
                    'assets/img/nodi/nodi-4.png'
                ],
                description: `
                    <p>This application allows you to perform the <strong>verification of joints</strong> for shear‑tension and shear‑compression, and the design of stirrups.</p>
                    <p>The stress verification can be carried out after defining the geometric and mechanical characteristics of the joint panel and the normal and shear forces acting on it.</p>
                    <p>The principal tensile and compressive stresses are compared with the material limit stresses.</p>
                    <p>Furthermore, taking into account pre‑cracking and post‑cracking mechanisms, with reference to <strong>Eurocode 8</strong> formula, the minimum amount of transverse reinforcement to be provided within the joint panel can be determined.</p>
                    <p>The application includes two example files that can be accessed by right‑clicking anywhere on the interface.</p>
                `
            },
            uhs: {
                title: 'Uniform hazard spectrum',
                badge: 'Matlab',
                images: [
                    'assets/img/spu/spu-1.jpg',
                    'assets/img/spu/spu-2.jpg',
                    'assets/img/spu/spu-3.jpg',
                    'assets/img/spu/spu-4.jpg',
                    'assets/img/spu/spu-5.jpg'
                ],
                description: `
                    <p>This application allows you to generate the <strong>uniform hazard spectrum</strong> and to perform hazard disaggregation.</p>
                    <p>The spectrum is derived for a linear seismogenic zone whose geometric characteristics and earthquake occurrence rate can be defined.</p>
                    <p>For the magnitude distribution, the <strong>Gutenberg–Richter law</strong> is considered, whose parameters can be defined.</p>
                    <p>Five different attenuation laws are used, for fixed oscillator periods, whose parameters can be specified to calculate the conditional probabilities present in the hazard integral, considering the pseudo‑spectral acceleration as the intensity measure.</p>
                    <p>The five different hazard curves are then elaborated and, by defining the return period, the uniform hazard spectrum is calculated.</p>
                    <p>The application includes an example file that can be accessed by right‑clicking anywhere on the interface.</p>
                `
            }
        }
    };

    // ---- FUNZIONE PER IMPOSTARE LA LINGUA ----
    function setLanguage(lang) {
        currentLang = lang;
        if (lang === 'en') {
            contentEn.style.display = 'block';
            contentIt.style.display = 'none';
            btnLang.innerHTML = '<i class="fas fa-globe"></i> Italiano';
        } else {
            contentEn.style.display = 'none';
            contentIt.style.display = 'block';
            btnLang.innerHTML = '<i class="fas fa-globe"></i> English';
        }
    }

    // ---- IMPOSTA INGLESE DI DEFAULT ----
    setLanguage('en');

    // ---- TOGGLE LINGUA ----
    btnLang.addEventListener('click', function () {
        if (currentLang === 'en') {
            setLanguage('it');
        } else {
            setLanguage('en');
        }
    });

    // ---- FUNZIONE PER GENERARE LA GALLERIA ----
    function generateGallery(images, title) {
        if (!images || images.length === 0) {
            return `
                <div class="gallery-container">
                    <div class="gallery-main" style="background:#f0f2f5; padding:40px; text-align:center; color:#7a8aa0;">
                        <i class="fas fa-image" style="font-size:3rem; display:block; margin-bottom:10px;"></i>
                        <p>No screenshots available</p>
                    </div>
                </div>
            `;
        }

        let thumbnailsHtml = images.map((img, idx) => `
            <img src="${img}" alt="${title} - ${idx + 1}" data-index="${idx}" class="${idx === 0 ? 'active' : ''}" />
        `).join('');

        return `
            <div class="gallery-container" data-images='${JSON.stringify(images)}'>
                <div class="gallery-main">
                    <img src="${images[0]}" alt="${title}" class="gallery-main-img" />
                    <button class="gallery-nav prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
                    <button class="gallery-nav next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
                    <span class="gallery-counter">1 / ${images.length}</span>
                </div>
                <div class="gallery-thumbnails">
                    ${thumbnailsHtml}
                </div>
            </div>
        `;
    }

    // ---- APERTURA MODALE CON GALLERIA ----
    function openModal(appKey) {
        const data = appData[currentLang][appKey];
        if (!data) return;

        const badgeClass = data.badge === 'Python' ? 'python' : 'matlab';

        const galleryHtml = generateGallery(data.images, data.title);

        modalBody.innerHTML = `
            <h2 class="app-title">${data.title}</h2>
            <span class="app-badge ${badgeClass}">${data.badge}</span>
            ${galleryHtml}
            <div class="app-description">${data.description}</div>
            <div class="app-modal-footer">
                <i class="fas fa-info-circle"></i> Click outside or press ESC to close.
            </div>
        `;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            initGallery();
        }, 100);
    }

    // ---- GALLERIA: NAVIGAZIONE ----
    let currentImageIndex = 0;
    let galleryImages = [];

    function initGallery() {
        const container = document.querySelector('.gallery-container');
        if (!container) return;

        const imagesData = container.dataset.images;
        if (imagesData) {
            galleryImages = JSON.parse(imagesData);
        } else {
            galleryImages = [];
            return;
        }

        if (galleryImages.length === 0) return;

        const mainImg = container.querySelector('.gallery-main-img');
        const counter = container.querySelector('.gallery-counter');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        const thumbnails = container.querySelectorAll('.gallery-thumbnails img');

        currentImageIndex = 0;
        updateGallery(mainImg, counter, thumbnails);

        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateGallery(mainImg, counter, thumbnails);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateGallery(mainImg, counter, thumbnails);
            });
        }

        thumbnails.forEach((thumb, idx) => {
            thumb.addEventListener('click', function (e) {
                e.stopPropagation();
                currentImageIndex = idx;
                updateGallery(mainImg, counter, thumbnails);
            });
        });

        document.removeEventListener('keydown', galleryKeyHandler);
        document.addEventListener('keydown', galleryKeyHandler);
    }

    function updateGallery(mainImg, counter, thumbnails) {
        if (!mainImg || !counter || !thumbnails) return;
        if (galleryImages.length === 0) return;

        mainImg.src = galleryImages[currentImageIndex];
        counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;

        thumbnails.forEach((thumb, idx) => {
            thumb.classList.toggle('active', idx === currentImageIndex);
        });
    }

    function galleryKeyHandler(e) {
        if (!document.querySelector('.modal.show')) {
            document.removeEventListener('keydown', galleryKeyHandler);
            return;
        }

        if (e.key === 'ArrowLeft') {
            const prevBtn = document.querySelector('.gallery-nav.prev');
            if (prevBtn) prevBtn.click();
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            const nextBtn = document.querySelector('.gallery-nav.next');
            if (nextBtn) nextBtn.click();
            e.preventDefault();
        }
    }

    // ---- CHIUSURA MODALE ----
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', galleryKeyHandler);
    }

    // ---- EVENTI ----
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('click', function () {
            const appKey = this.dataset.app;
            openModal(appKey);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

});