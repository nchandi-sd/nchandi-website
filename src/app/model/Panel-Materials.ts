export class PanelMaterials {
  id: string;
  title: string;
  url: string;
  order?: number;
}


function removePanelMaterial(name: String) {
  this.PANEL_MATERIALS.array.forEach(elem => {
    if (elem.name === name) {
      alert('should delete ' + name);
    }
  });
}
