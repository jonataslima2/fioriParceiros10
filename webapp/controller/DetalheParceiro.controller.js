sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment"
    ],
    function(BaseController, Fragment) {
      "use strict";
  
      return BaseController.extend("fiori.z99bp.controller.DetalheParceiro", {
        onInit: function() {

            this._oFragment;

            //resgata o roteador 
            let oRoteador = this.getOwnerComponent().getRouter();

            //interceptar a rota de detalhe e anexar uma função para resgatar o ID
            oRoteador.getRoute("RouteDetalheParceiro").attachPatternMatched(this.rotaDetalheParceiro, this);
        },

        rotaDetalheParceiro: function(oEvent){
            //resgata o ID do parceiro na URL
            let sIdParceiro = oEvent.getParameters().arguments.idParceiro;
            
            //resgata o modelo principal OData (sem nome)
            let oModel = this.getOwnerComponent().getModel();

            //monta o caminho do Read no modelo
            let sCaminho = oModel.createKey("Parceiros", {
                PartnerId: sIdParceiro
            });

            //associa o caminho do parceiro no modelo na view 
            this.getView().bindElement(sCaminho);

            if(!this._oFragment){
            Fragment.load({
                name: "fiori.z99bp.view.fragment.formParceiro",
                controller: this
            }).then(oFragment => {
                //guardar o fragmento instanciado
                this._oFragment = oFragment;

                //inclui como dependente da view
                this.getView().addDependent(oFragment);
                //exibe o fragmento na content da página
                this.getView().byId("detalheParceiro").addContent(oFragment);
            });
            }else{
                //exibe o fragmento na content da página
                this.getView().byId("detalheParceiro").addContent(oFragment);
            }

        }

      });
    }
  );