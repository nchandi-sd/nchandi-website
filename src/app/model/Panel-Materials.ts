export class PanelMaterials {
  id: string;
  title: string;
  url: string;
}


function removePanelMaterial(name: String) {
  this.PANEL_MATERIALS.array.forEach(elem => {
    if (elem.name === name) {
      alert('should delete ' + name);
    }
  });
}
