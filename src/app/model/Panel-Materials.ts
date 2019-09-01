import {Resource} from './Resource';

export class PanelMaterials {
  $key: string;
  title: string;
  url: string;
}


function addPanelMaterial() {

}

function removePanelMaterial(name: String) {
  this.PANEL_MATERIALS.array.forEach(elem => {
    if (elem.name === name) {
      alert('should delete ' + name);
    }
  });
}
