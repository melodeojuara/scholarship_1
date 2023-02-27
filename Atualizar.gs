function cleaning_and_security(){

  var spreadsheet = SpreadsheetApp.getActive()

  var predio = spreadsheet.getSheetByName('Simulação').getRange('D2').getValue()
  var hora = spreadsheet.getSheetByName('Simulação').getRange('D3').getValue()
  var dias =  spreadsheet.getSheetByName('Simulação').getRange('D4').getValue()
  var custos_de_limpeza = spreadsheet.getSheetByName('Simulação').getRange('G4')
  var custos_de_seguranca = spreadsheet.getSheetByName('Simulação').getRange('G5')

  vh_limpeza = (3771.05 / (30 * 24)) * (hora * dias)
  vh_seguranca = (19084.60 / (30 * 24)) * (hora * dias)

  var ordem = new Map()
  ordem.set('Campo de Futebol', 6)
  ordem.set('Pista de Atletismo', 9)
  ordem.set('Piscina', 2)
  ordem.set('Quadra Poliesportiva', 1)

  custos_de_limpeza.setValue(vh_limpeza*ordem.get(predio))
  custos_de_seguranca.setValue(vh_seguranca)

  if (predio == ''){
  custos_de_limpeza.setValue(0)
  custos_de_seguranca.setValue(0)
  }
}

function depreciation() {
  /** Variáveis necessárias para calculo */
  const hoje = new Date()
  var i_idade = hoje.getFullYear() - 2019

  /** Informações sobre a construção */
  var spreadsheet = SpreaadsheetApp.getActive()
  var e_custo_de_manutencao = spreadsheet.getRange('G2')
  var predio = spreadsheet.getRange('D2').getValue()

  /** Informações sobre o evento */
  var e_duracao_horas = spreadsheet.getRange('D3').getValue()
  var e_duracao_dias = spreadsheet.getRange('D4').getValue()

  /** Definição de dicionário para chamar o índice nas listas */
  var ordem = new Map()
  ordem.set('Campo de Futebol', 0)
  ordem.set('Pista de Atletismo', 1)
  ordem.set('Piscina', 2)
  ordem.set('Quadra Poliesportiva', 3)

  /** As listas a seguir contem dados refentes ao complexo esportivo sobre:
   * Custo de construção e data de construção.
   * Os dados SEMPRE seguem a ordem que consta no dicionário. */

  i_custo_de_construcao = [9178027.29, 13873321.26, 1437461.37, 808536.15]
  i_expectativa_de_vida = [30,20,25,30]
  
  function Depreciacao_Kuentle(a,b,c,d){
    return (((a[d]**2) - (b**2)) / (a[d]**2)) * c[d]
  }

  x = Depreciacao_Kuentle(i_expectativa_de_vida,i_idade,i_custo_de_construcao,ordem.get(predio))
  y = Depreciacao_Kuentle(i_expectativa_de_vida,i_idade - 1,i_custo_de_construcao,ordem.get(predio))
  var z = (y - x)/(12*30*24)
  e_custo_de_manutencao.setValue(z * (e_duracao_horas * e_duracao_dias))

  if (predio == ''){
    e_custo_de_manutencao.setValue(0)    
  }

  cleaning_and_security()

}

