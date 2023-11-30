let originalText = ''; // Declare the global variable
let textarea;
let comp;
let compElement;
let report;

document.addEventListener('DOMContentLoaded', function () {
  var originalTextArea = document.getElementById('OriginalText');
  textarea = document.getElementById('google');
  comp = document.getElementsByClassName('comp');
  report = document.getElementsByClassName('report123');
  console.log(report[0]);
  // Add an event listener for the 'input' event
  originalTextArea.addEventListener('input', function () {
    // Log the input value to the console
    originalText = this.value;
  });
});
const data = {
  analysis_result: {
    long_pauses: 15,
    short_pauses: 0,
    word_repetitions: 43,
  },
  confidence: 0.74088609,
  deleted_words: [
    'boodschappenlijst',
    'melkafdeling',
    'ook',
    '“houdbaar”',
    'liggen',
    'verpakte',
    'legde',
    'slot',
    'betaalde',
  ],
  duplicate_lines: 0,
  error_metrics: {
    WC: 69,
    WR: 183,
    'Words Correct per Minute': 34.5,
  },
  inserted_words: [
    'groeit',
    'wat',
    'van',
    'boodschappenlijstje',
    'paar',
    'loopt',
    'melk',
    'af',
    'trainen',
    'af',
    'afgelegen',
    'houdbaar',
    'ligt',
    'lig',
    'legte',
    'hondenbrokjes',
    'slotte',
    'betaal',
    'nee',
    'dankjewel',
  ],
  pause_metrics: {
    'Hesitations (3+ seconds)': 2,
    'Pauses (1-3 seconds)': 5,
  },
  repeated_words: [
    'ik',
    'boodschappen',
    'wilde',
    'doen',
    'vind',
    'en',
    'een',
    'moest',
    'pak',
    'karnemelk',
    'kaas',
    'rookworst',
    'komkommer',
    'dat',
    'stond',
    'in',
    'de',
    'want',
    'naar',
    'af',
    'nog',
    'mijn',
    'met',
  ],
  repeated_words_length: 23,
  skipped_lines: 0,
  substituted_words: [
    'boodschappenlijst',
    'melkafdeling',
    'ook',
    '“houdbaar”',
    'liggen',
    'verpakte',
    'legde',
    'slot',
    'betaalde',
  ],
  transcribed_text:
    'mijn vader groeit vroeg of ik boodschappen wilde doen wat wilde ik wel van boodschappen doen vind ik erg leuk Ik nam de grote tas geld en een boodschappenlijstje mee Ik moest een paar een pak karnemelk een pak hondenbrokken een kilo kaas en rookworst en een komkommer loopt kopen Dat stond allemaal op het lijstje in de supermarkt Ik weet ik ik al goed in de weg want ik kom er vaak Eerst ging ik de melk af trainen om de karnemelk te pakken melkproducten noem je de zuivelproducten daarna liep ik naar de af kaasafdeling Dat vind ik altijd fijn want ik krijg er meestal een blokje kaas tenminste als ik kaas Bestel nu nog naar de afgelegen houdbaar Want daar ligt de spullen Ik lig legte de hondenbrokjes en de rookworst in mijn boodschappenmandje tot slotte moest ik nog naar de afdeling met groente en fruit want ik had nog een komkommer nodig bij de kassa stond gelukkig geen lange rij dus ik was snel aan de beurt ik betaal met een met briefgeld ik kreeg de kassabon nee dankjewel',
  word_count: 183,
  original_vs_audio: '94%',
  audio_duration: 193,
  accuracy: 18,
};
console.log(comp);
let url =
  'https://firebasestorage.googleapis.com/v0/b/test-9233a.appspot.com/o/audios%2FAVI%202.wav?alt=media&token=a8352d03-abf9-425a-b077-3ab83a7da8e5';
const firebaseConfig = {
  apiKey: 'AIzaSyCjCM6G2Bb6DUF9DSpK0lFSWAKhsKj9OCI',
  authDomain: 'test-9233a.firebaseapp.com',
  projectId: 'test-9233a',
  storageBucket: 'test-9233a.appspot.com',
  messagingSenderId: '943318464055',
  appId: '1:943318464055:web:ade59a27815c8010e4b1b2',
  measurementId: 'G-Y2VY5WB0TP',
};
firebase.initializeApp(firebaseConfig);

var fileText = document.querySelector('.fileText');
var uploadPercentage = document.querySelector('.uploadPercentage');
var progress = document.querySelector('.progress');
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector('.img');
let fileUrl;
function getFile(e) {
  fileItem = e.target.files[0];
  fileName = fileItem.name;
  fileText.innerHTML = fileName;
}

function uploadAudio() {
  fileUrl = url;
  // let storageRef = firebase.storage().ref('audios/' + fileName);
  // let uploadTask = storageRef.put(fileItem);
  // uploadTask.on(
  //   'state_changed',
  //   (snapshot) => {
  //     percentVal = Math.floor(
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     );
  //     console.log(percentVal);
  //     uploadPercentage.innerHTML = percentVal + '%';
  //     progress.style.width = percentVal + '%';
  //   },
  //   (error) => {
  //     console.log('Error is ', error);
  //   },
  //   () => {
  //     uploadTask.snapshot.ref.getDownloadURL().then((url) => {
  //       fileUrl = url;
  //       console.log(fileUrl);
  //     });
  //   }
  // );
}

function compareText(originalText, spokenText) {
  const originalLines = originalText.split('\n');
  const spokenLines = spokenText.split('\n');

  let resultHtml = '';

  for (let i = 0; i < originalLines.length; i++) {
    const originalWords = originalLines[i].split(/\s+/);
    const spokenWords = spokenLines[i] ? spokenLines[i].split(/\s+/) : [];

    for (let j = 0; j < originalWords.length || j < spokenWords.length; j++) {
      const originalWord = originalWords[j] || '';
      const spokenWord = spokenWords[j] || '';

      if (originalWord === spokenWord) {
        resultHtml += `<span class="correct">${originalWord}</span> `;
      } else {
        if (
          originalWords.slice(j).join(' ') === spokenWords.slice(j).join(' ')
        ) {
          resultHtml += `<span class="duplicate-line">${originalWords
            .slice(j)
            .join(' ')}</span> `;
          j = originalWords.length; // Skip the remaining words in this line
        } else {
          if (originalWord && !spokenWord) {
            resultHtml += `<span class="insertion">${originalWord}</span> `;
          } else if (!originalWord && spokenWord) {
            resultHtml += `<span class="deletion">${spokenWord}</span> `;
          } else {
            if (originalWord === spokenWords[j - 1]) {
              resultHtml += `<span class="repetition">${originalWord}</span> `;
            } else {
              resultHtml += `<span class="substitution">${originalWord}</span><span class="deletion">${spokenWord}</span> `;
            }
          }
        }
      }
    }

    // Check if the spoken line is shorter, indicating a jump
    if (spokenWords.length < originalWords.length) {
      resultHtml += `<span class="jump">...</span> `;
    }

    // Check if the entire line is skipped
    if (!spokenLines[i]) {
      resultHtml += `<span class="line-skip">${originalLines[i]}</span>`;
      break; // Break to the next line as this line is skipped
    }
  }

  return resultHtml;
}

// function generateReportHTML(
//   wordsRead,
//   wordsCorrect,
//   WCPM,
//   Deletions,
//   Substitutions,
//   audioDuration,
//   Insertions,
//   Pauses,
//   Hesitations,
//   corrections,
//   skipedLine,
//   jumpedLine,
//   duplicate_lines,
//   Accuracy,
//   confidenceScore,
//   transvsOrginal,
//   manualVstranscription,
//   manualVsorginal
// ) {
//   // Create the main container
//   const container = document.createElement('div');
//   // container.style.display = 'flex';
//   // container.style.padding = '20px';

//   // Create the left column
//   const leftColumn = document.createElement('div');
//   leftColumn.style.display = 'flex';
//   leftColumn.style.flexDirection = 'column';
//   leftColumn.style.flexWrap = 'nowrap';

//   // Words Reads (WR)
//   createSpan(leftColumn, 'Words Reads (WR):');
//   createSpan(leftColumn, wordsRead);

//   // Words Correct (WC)
//   createSpan(leftColumn, 'Words Correct (WC):');
//   createSpan(leftColumn, wordsCorrect);

//   createSpan(leftColumn, 'Words Correct Per Minute (WCPM):');
//   createSpan(leftColumn, WCPM);

//   // Error classification
//   createSpan(leftColumn, 'Deletions:');
//   createSpan(leftColumn, Deletions);

//   // Words Correct (WC)
//   createSpan(leftColumn, 'Insertions:');
//   createSpan(leftColumn, Insertions);

//   createSpan(leftColumn, 'Substitutions:');
//   createSpan(leftColumn, Substitutions);

//   // Audio duration
//   createSpan(leftColumn, 'Pauses (1 till 3 seconds)');
//   createSpan(leftColumn, Pauses);

//   // Transcription confidence score
//   createSpan(leftColumn, 'Hesitations (3+ seconds)');
//   createSpan(leftColumn, Hesitations);

//   // Transcription vs original text
//   createSpan(leftColumn, 'Self corrections (within 3 seconds)');
//   createSpan(leftColumn, corrections);

//   // Manual Transcription vs Transcription
//   createSpan(leftColumn, 'Skipped lines:');
//   createSpan(leftColumn, skipedLine);

//   // Manual Transcription vs original text
//   createSpan(leftColumn, 'Jumped line');
//   createSpan(leftColumn, jumpedLine);
//   createSpan(leftColumn, 'Duplicate line');
//   createSpan(leftColumn, duplicate_lines);

//   // Manual Transcription vs original text
//   createSpan(leftColumn, 'Accuracy:');
//   createSpan(leftColumn, Accuracy);
//   // Manual Transcription vs original text
//   createSpan(leftColumn, 'Audio duration:');
//   createSpan(leftColumn, audioDuration);
//   // Manual Transcription vs original text
//   createSpan(leftColumn, 'Transcription confidence score (if provided):');
//   createSpan(leftColumn, confidenceScore);
//   // Manual Transcription vs original text
//   createSpan(leftColumn, 'Transcription vs original text');
//   createSpan(leftColumn, transvsOrginal);
//   createSpan(leftColumn, 'Manual transcription vs transcription');
//   createSpan(leftColumn, manualVstranscription);
//   createSpan(leftColumn, 'Manual transcription vs original text');
//   createSpan(leftColumn, manualVsorginal);

//   // Create the right column
//   const rightColumn = document.createElement('div');
//   rightColumn.style.display = 'flex';
//   rightColumn.style.flexDirection = 'column';

//   // Fill the right column with corresponding values
//   createSpan(rightColumn, wordsRead);
//   createSpan(rightColumn, wordsCorrect);
//   createSpan(rightColumn, wordsCorrect);
//   createSpan(rightColumn, audioDuration);
//   createSpan(rightColumn, wordsRead);
//   createSpan(rightColumn, wordsCorrect);
//   createSpan(rightColumn, wordsCorrect);
//   createSpan(rightColumn, transcriptionConfidence);
//   createSpan(rightColumn, wordsRead);
//   createSpan(rightColumn, wordsCorrect);
//   createSpan(rightColumn, wordsCorrect);
//   createSpan(rightColumn, transcriptionConfidence);
//   createSpan(rightColumn, wordsRead);
//   createSpan(rightColumn, wordsCorrect);
//   createSpan(rightColumn, wordsCorrect);
//   createSpan(rightColumn, audioDuration);
//   createSpan(rightColumn, wordsRead);
//   createSpan(rightColumn, wordsCorrect);
//   createSpan(rightColumn, wordsCorrect);

//   // Append left and right columns to the main container
//   container.appendChild(leftColumn);
//   container.appendChild(rightColumn);

//   return container;
// }

// Helper function to create a span element and append it to a parent
function createSpan(parent, text) {
  const span = document.createElement('span');
  span.textContent = text;
  parent.appendChild(span);
}
function compareAudio() {
  console.log(fileUrl, originalText);
  textarea.value = data.transcribed_text;

  // Ensure that compElement is assigned correctly
  compElement = comp[0];
  const comparedHtml = compareText(originalText, data.transcribed_text);
  compElement.innerHTML = comparedHtml;
  // const reportContainer = generateReportHTML(
  //   '22',
  //   '120',
  //   ['Deletions', 'Insertions', 'Repetitions'],
  //   '78 seconds',
  //   '78%',
  //   '78%',
  //   '78%',
  //   '78%'
  // );

  const wordsCorrectPerElement = document.getElementById('Words-Correct-Perr');
  const deletionsElement = document.getElementById('Deletions');
  const insertionsElement = document.getElementById('Insertions');
  const repetitionsElement = document.getElementById('Repetitions');
  const substitutionsElement = document.getElementById('Substitutions');
  const pausesElement = document.getElementById('Pauses');
  const hesitationsElement = document.getElementById('Hesitations');
  const selfElement = document.getElementById('Self');
  const skippedElement = document.getElementById('Skipped');
  const jumpedElement = document.getElementById('Jumped');
  const duplicateElement = document.getElementById('Duplicate');
  const accuracyElement = document.getElementById('Accuracy');
  const audioDurationElement = document.getElementById('audio-duration');
  const transcriptionElement = document.getElementById('transcription');
  const transcriptionOriginalTextElement = document.getElementById(
    'transcription-orginal-text'
  );
  const manualTranscriptionElement = document.getElementById(
    'Manual-transcription'
  );
  const manualOriginalElement = document.getElementById('Manual-original');

  console.log('working');
  document.getElementById('Words-Reads').textContent = data.error_metrics.WR;
  document.getElementById('Words-Correct').textContent = data.error_metrics.WC;
  wordsCorrectPerElement.textContent =
    data.error_metrics['Words Correct per Minute'];
  deletionsElement.textContent = data.deleted_words.length;
  insertionsElement.textContent = data.inserted_words.length;
  repetitionsElement.textContent = data.repeated_words.length;
  substitutionsElement.textContent = data.substituted_words.length;
  pausesElement.textContent = data.pause_metrics['Pauses (1-3 seconds)'];
  hesitationsElement.textContent =
    data.pause_metrics['Hesitations (3+ seconds)'];
  skippedElement.textContent = data.skipped_lines;
  jumpedElement.textContent = 2;
  duplicateElement.textContent = data.duplicate_lines;
  transcriptionOriginalTextElement.textContent = data.original_vs_audio;
  audioDurationElement.textContent = data.audio_duration;
  accuracyElement.textContent = data.accuracy;
  // console.log(reportContainer);
  // compElement.textContent = 'aads';
  // Make the AJAX request using the Fetch API
  // fetch('http://15.222.30.141:5000/process_audio', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     audio_url: fileUrl,
  //     original_text: originalText,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((result) => {
  //     console.log(result);

  //     // Extract the transcribed text from the API response
  //     var originalText = result.transcribed_text;
  //     console.log('Extracted Text:', originalText);

  //     textarea.value = data.transcribed_text;

  //     // Now you can use the extracted text for further processing or display
  //     // ...

  //     // Continue with the rest of your logic
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
}
