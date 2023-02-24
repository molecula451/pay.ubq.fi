import { connectWallet } from './connect-wallet';
import draw from './draw';
import { withdraw } from './withdraw';

let detailsVisible = false;

const table = document.getElementsByTagName(`table`)[0];
table.setAttribute(`data-details-visible`, detailsVisible.toString());

const additionalDetails = document.getElementById(`additionalDetails`);
if (!additionalDetails) console.error('additionalDetails not found');
else
  additionalDetails.addEventListener(`click`, function () {
    detailsVisible = !detailsVisible;
    table.setAttribute(`data-details-visible`, detailsVisible.toString());
  });

const claimButton = document.getElementById('claimButton');
if (!claimButton) console.error('claimButton not found');
else
  claimButton.addEventListener('click', async () => {
    const { signer, txData } = await connectWallet(global.txData);
    try {
      withdraw({ signer, txData });
    } catch (error) {
      console.error(error);
    }
  });

(async function () {
  // display commit hash
  const commit = await fetch('commit.txt');
  const commitHash = await commit.text();
  const buildElement = document.querySelector(`#build a`) as HTMLAnchorElement;
  if (!buildElement) console.error('buildElement not found');

  buildElement.innerHTML = `${commitHash}`;
  buildElement.href = `https://github.com/ubiquity/generate-permit/commit/${commitHash}`;
})();

global.onerror = function (error) {
  // @ts-ignore
  delete error.stack;
  const output = document.querySelector(`footer>code`) as HTMLTextAreaElement;
  output.innerText = JSON.stringify(error, null, 2);
};

draw()({
  cell_resolution: 24,
  point_resolution: 1,
  shade: 128,
  step: 0.015625,
  refresh: 1000 / 15,
  target: document.getElementById('grid'),
  // id: 'canvas'
});
