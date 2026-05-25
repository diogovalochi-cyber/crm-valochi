import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import type { AgendaItem } from '../context/DashboardContext';

// ============================================================
// Dados Oficiais de Vendedores (01/05 a 23/05)
// ============================================================
// ============================================================
// Banco de Dados Oficial de Vendedores e Carteiras (01/05 a 23/05)
// ============================================================
export interface ClienteInfo {
  codigo: string;
  nome: string;
  valor: number;
}

export interface SellerOfficialData {
  id: string;
  nome: string;
  faturamentoTotal: number;
  totalPedidos: number;
  clientes: ClienteInfo[];
  avatar: string;
  maiorCliente: string;
}

export const VENDEDORES_MAP_MAIO: Record<string, Omit<SellerOfficialData, 'avatar' | 'maiorCliente'>> = {
  "093": {
    id: "093",
    nome: "Guilherme",
    faturamentoTotal: 397646.22,
    totalPedidos: 224,
    clientes: [
      { codigo: "119", nome: "SAMUEL DE OLIVEIRA CHAGAS", valor: 25928.72 },
      { codigo: "4313", nome: "INTECS JARDIM JARAGUA", valor: 23848.43 },
      { codigo: "3998", nome: "AÇOUGUE TENESSE", valor: 20220.24 },
      { codigo: "4310", nome: "INTECS BRASILANDIA", valor: 20051.71 },
      { codigo: "4316", nome: "INTECS CIDADE TIRADENTES", valor: 17570.85 },
      { codigo: "4534", nome: "INTECS M BOI MIRIM", valor: 17313.09 },
      { codigo: "852", nome: "MERCADO ULTRA ECONOMIA", valor: 16410.78 },
      { codigo: "4314", nome: "INTECS SAO MIGUEL PAULISTA", valor: 15717.59 },
      { codigo: "4315", nome: "INTECS GUAIANASES", valor: 14793.41 },
      { codigo: "4000", nome: "TENESSE CARNES GUABIROBA", valor: 14048.28 },
      { codigo: "4983", nome: "PANIFICADORA DELICIAS DO TRIGO", valor: 13785.13 },
      { codigo: "4136", nome: "MERCADINHO NITEROI", valor: 12657.20 },
      { codigo: "4311", nome: "INTECS CITY JARAGUA", valor: 12036.30 },
      { codigo: "4164", nome: "MERCADINHO LUIGI", valor: 11659.42 },
      { codigo: "4063", nome: "MERCADO PERNAMBUCO", valor: 9645.64 },
      { codigo: "4489", nome: "PLANALTO", valor: 9166.76 },
      { codigo: "4864", nome: "PADARIA E CONFEITARIA SAO LUIS", valor: 9120.24 },
      { codigo: "3933", nome: "WL SUPERMERCADO JACUTINGA", valor: 8733.13 },
      { codigo: "4380", nome: "MERCADO PROGRESSO", valor: 8608.30 },
      { codigo: "4726", nome: "MERCADO PRECIOSO", valor: 8318.66 },
      { codigo: "3382", nome: "MERCADO ΜΑΙΑ", valor: 8053.19 },
      { codigo: "4190", nome: "SUPERMERCADOS SEMPRE JUNTO", valor: 8009.69 },
      { codigo: "258", nome: "LUIZ JACAREÍ", valor: 7492.63 },
      { codigo: "3999", nome: "TENESSE CARNES RAGUEB", valor: 7362.97 },
      { codigo: "4701", nome: "MERCADO ALCANTARA", valor: 7033.24 },
      { codigo: "550", nome: "PATRICIA AP. DA SILVA", valor: 6670.92 },
      { codigo: "4710", nome: "MERCADO JL", valor: 6582.59 },
      { codigo: "4962", nome: "MERCADO PROGRESSO LOJA 1", valor: 6475.95 },
      { codigo: "4012", nome: "MERCADO SAO FRANCISCO DE PAULA", valor: 6067.45 },
      { codigo: "4849", nome: "MERCADO BEM ESTAR", valor: 6014.32 },
      { codigo: "4250", nome: "JM MERCADO", valor: 5868.00 },
      { codigo: "4963", nome: "MERCADO PROGRESSO LOJA 02", valor: 5215.13 },
      { codigo: "4336", nome: "MERCADO MICHELITO", valor: 5008.63 },
      { codigo: "781", nome: "OSVALDO XAVIER DE MACEDO JUNIOR", valor: 5000.79 },
      { codigo: "4735", nome: "MERCADO ECONOMIX", valor: 4498.32 },
      { codigo: "4986", nome: "PADARIA DONA ANA", valor: 3258.75 },
      { codigo: "4964", nome: "MERCADO PROGRESSO LOJA 03", valor: 3214.75 },
      { codigo: "4387", nome: "MERCADO ICHIBAN", valor: 2812.01 },
      { codigo: "4633", nome: "MERCADO ANA MARIA", valor: 2802.63 },
      { codigo: "4943", nome: "PADARIA DONA BELLA", valor: 570.38 }
    ]
  },
  "094": {
    id: "094",
    nome: "Relson",
    faturamentoTotal: 212441.19,
    totalPedidos: 42,
    clientes: [
      { codigo: "2662", nome: "PEG LEVE", valor: 32501.96 },
      { codigo: "3576", nome: "PADARIA RAIO DE SOL PRA", valor: 14058.51 },
      { codigo: "4544", nome: "SUPERMERCADO DO FRANGO", valor: 13916.77 },
      { codigo: "1990", nome: "COMERCIAL CARNES SÃO JORGE", valor: 11233.40 },
      { codigo: "4136", nome: "MERCADO E ACOUGUE DUAS IRMAS", valor: 10965.99 },
      { codigo: "266", nome: "MERCADO TRINDADE", valor: 10052.56 },
      { codigo: "4644", nome: "MERCADO CASTELO", valor: 9387.40 },
      { codigo: "4192", nome: "FENIX SUPERMERCADO LOJA 2", valor: 8911.23 },
      { codigo: "3343", nome: "MERCADO NOGUEIRA", valor: 8650.21 },
      { codigo: "2341", nome: "SUPERMERCADO DIA A DIA", valor: 7915.21 },
      { codigo: "1174", nome: "MARI SUPERMERCADOS", valor: 7216.40 },
      { codigo: "4540", nome: "HORTIFRUTI GATÃO", valor: 6305.52 },
      { codigo: "2230", nome: "MERCADINHO VILA CLELIA", valor: 5928.50 },
      { codigo: "4353", nome: "EXTRA BOM VALO VELHO", valor: 5372.21 },
      { codigo: "4364", nome: "EMPORIO SANTO ESTEVAO", valor: 4896.40 },
      { codigo: "4501", nome: "MERCADO DO BAIANO", valor: 4312.19 },
      { codigo: "4415", nome: "PADARIA E MERCEARIA KI PANELA", valor: 3864.12 },
      { codigo: "4196", nome: "FOX CARNES CAPAO REDONDO", valor: 3611.40 },
      { codigo: "4813", nome: "LANCHONETE TURMA DA MONICA", valor: 2318.09 },
      { codigo: "4805", nome: "MALIBU EMPORIO E CONVENIENCIA", valor: 2229.30 },
      { codigo: "3924", nome: "SUPERMERCADO DO REI", valor: 2060.88 },
      { codigo: "4407", nome: "LEONARDO DE OLIVEIRA LIRA", valor: 2048.94 },
      { codigo: "3777", nome: "DI PAES BOLOS E LANCHES", valor: 1768.07 },
      { codigo: "4131", nome: "MERCADO GAMA", valor: 1714.17 }
    ]
  },
  "115": {
    id: "115",
    nome: "Israel",
    faturamentoTotal: 165187.17,
    totalPedidos: 135,
    clientes: [
      { codigo: "2495", nome: "IPAVA RAIO SUPERMERCADO LTDA", valor: 15966.12 },
      { codigo: "2380", nome: "MERCADINHO PRECO BOM", valor: 9749.13 },
      { codigo: "4296", nome: "BLACK BOI", valor: 6697.29 },
      { codigo: "4832", nome: "MERCADINHO RIOS CARNEIRO LTDA", valor: 5671.93 },
      { codigo: "4723", nome: "BLACK BOI JD RECORD", valor: 5498.81 },
      { codigo: "17", nome: "ANA NIVIA PEIXOTO FERREIRA", valor: 5493.23 },
      { codigo: "4725", nome: "O BOIADEIRO", valor: 5350.36 },
      { codigo: "172", nome: "JOSE ADEILSON", valor: 4829.90 },
      { codigo: "4195", nome: "FOX CARNES INDEPENDENCIA", valor: 4444.82 },
      { codigo: "4884", nome: "MERCADO SONIA", valor: 4361.55 },
      { codigo: "4093", nome: "PADARIA BAR DO ZE", valor: 4124.53 },
      { codigo: "4722", nome: "BARATINHO ALMEIDA", valor: 3997.13 },
      { codigo: "2499", nome: "SUPERMERCADO BEATRIZ LTDA", valor: 3803.19 },
      { codigo: "3437", nome: "ENERGIA POSITIVA", valor: 3695.47 },
      { codigo: "4875", nome: "PADARIA GOLDEN GRAO MERCADO", valor: 3603.15 },
      { codigo: "266", nome: "MERCADO TRINDADE", valor: 3025.31 },
      { codigo: "4724", nome: "BLACK BOI SUPER SA", valor: 3022.16 },
      { codigo: "3350", nome: "MERCEARIA DO MINEIRO", valor: 2977.67 },
      { codigo: "4389", nome: "MERCEARIA LICOTA", valor: 2932.79 },
      { codigo: "2808", nome: "MERCEARIA 3 IRMÃOS", valor: 2848.73 },
      { codigo: "4186", nome: "HORTIFRUTI MAIS SABOR", valor: 2734.77 },
      { codigo: "171", nome: "MINI MERCADO GUSTAVINHO", valor: 2532.87 },
      { codigo: "4134", nome: "DUBOM CAFE", valor: 2518.43 },
      { codigo: "4685", nome: "EMPORIO DANI E CIA", valor: 2305.85 },
      { codigo: "142", nome: "WANESSA MISSIAS DE SOUZA", valor: 2300.56 },
      { codigo: "4630", nome: "AÇOUGUE PATA NEGRA", valor: 2292.48 },
      { codigo: "2103", nome: "FERREIRA PAES E DOCES", valor: 2223.61 },
      { codigo: "4904", nome: "PADARIA INTERLAGOS LTDA", valor: 2202.03 },
      { codigo: "4893", nome: "MERCADO SOUZA LIMA", valor: 2198.73 },
      { codigo: "4680", nome: "MERCADO HORA CERTA", valor: 2020.71 },
      { codigo: "1174", nome: "MARI SUPERMERCADOS", valor: 2006.42 },
      { codigo: "2813", nome: "GERLAINE SOUZA MOREIRA CARLOS", valor: 1939.62 },
      { codigo: "4568", nome: "EMPORIO DOS ALIMENTOS", valor: 1911.02 },
      { codigo: "4508", nome: "PADARIA TRES IRMÃOS VISTA ALEGRE", valor: 1901.25 },
      { codigo: "2230", nome: "MERCADINHO VILA CLELIA", valor: 1702.29 },
      { codigo: "4562", nome: "MAIS BARATO MINI MERCADO", valor: 1700.08 },
      { codigo: "4073", nome: "FOX CARNE", valor: 1665.36 },
      { codigo: "4201", nome: "FOX CARNES JD ROSA*", valor: 1635.77 },
      { codigo: "1657", nome: "MERCADO SANTA FE", valor: 1547.40 },
      { codigo: "4550", nome: "PADARIA SÃO MARCOS", valor: 1534.83 },
      { codigo: "4820", nome: "PADARIA TEREZINHA", valor: 1491.75 },
      { codigo: "2128", nome: "PADARIA NOVA GEOGRAFOS", valor: 1468.99 },
      { codigo: "4662", nome: "PADARIA PAO NOBRE LOJA 2", valor: 1423.57 },
      { codigo: "4513", nome: "BOI FORT", valor: 1184.82 },
      { codigo: "98", nome: "MINI MERCADO REIS LTDA ME", valor: 1183.57 },
      { codigo: "1268", nome: "PADARIA VITORIA", valor: 1150.08 },
      { codigo: "2289", nome: "ACOUGUE E MERCEARIA NANDA", valor: 1140.03 },
      { codigo: "4450", nome: "PADARIA ARRUDA", valor: 1055.88 },
      { codigo: "3077", nome: "MERCADO T.D. JARDIM JARAGUA", valor: 1019.40 },
      { codigo: "4467", nome: "PADARIA PAO NOBRE", valor: 1016.84 },
      { codigo: "2193", nome: "HORTIFRUTI OLIVEIRA", valor: 960.82 },
      { codigo: "4242", nome: "PADARIA DUAS IRMAS", valor: 923.26 },
      { codigo: "2496", nome: "MERCADINHO AMANHECER", valor: 900.25 },
      { codigo: "2062", nome: "PADARIA BELLATRIZ", valor: 882.00 },
      { codigo: "3481", nome: "MERCADO EMPORIO EUCALIPTOS", valor: 879.26 },
      { codigo: "4650", nome: "MERCADO EUCALIPTO LOJA 02", valor: 782.33 },
      { codigo: "4191", nome: "FENIX SUPERMERCADO", valor: 780.00 },
      { codigo: "4423", nome: "PANIFICADORA GNC", valor: 760.50 },
      { codigo: "3498", nome: "MARCOS DOS SANTOS", valor: 648.05 },
      { codigo: "4188", nome: "MERCADO DA CARNE SHOP BUTCHER", valor: 624.00 },
      { codigo: "2216", nome: "ROSELIANA DOS SANTOS PAES", valor: 597.03 },
      { codigo: "2383", nome: "SABORES DA VILA", valor: 521.75 },
      { codigo: "4942", nome: "PADARIA DUAS IRMAS 2", valor: 417.64 },
      { codigo: "2735", nome: "MERCADO BOM CLIMA", valor: 408.00 }
    ]
  },
  "116": {
    id: "116",
    nome: "Natália",
    faturamentoTotal: 163851.21,
    totalPedidos: 134,
    clientes: [
      { codigo: "1681", nome: "DISTRIBUIDORA DE HORTIFRUTIGRANJEIRO", valor: 22098.07 },
      { codigo: "3108", nome: "SUPERMERCADO PETEKO", valor: 17304.93 },
      { codigo: "14", nome: "ADRIANA / JOAO", valor: 12890.43 },
      { codigo: "3402", nome: "SONHADOR", valor: 11123.39 },
      { codigo: "1996", nome: "MERCADO PALACIOS", valor: 9258.94 },
      { codigo: "4541", nome: "HORTIFRUTI GATÃO LOJA 02", valor: 9011.30 },
      { codigo: "3369", nome: "MERCADO GONÇALVES", valor: 8903.95 },
      { codigo: "144", nome: "LEANDRO RIBEIRO PORTO", valor: 8185.16 },
      { codigo: "2726", nome: "MERCADO GABRIEL", valor: 7426.86 },
      { codigo: "43", nome: "MANOEL A SOBRINHO-ME", valor: 6573.90 },
      { codigo: "1982", nome: "BAR E MERCEARIA ROSA", valor: 5570.99 },
      { codigo: "2416", nome: "ÉRICA PORFÍRIO SANTA ROSA FERREIRA", valor: 5391.73 },
      { codigo: "92", nome: "FRANCISCO CANINDÉ DE LUCAS LOJA 02", valor: 4936.68 },
      { codigo: "520", nome: "MARA FERREIRA MARQUES", valor: 4650.39 },
      { codigo: "2750", nome: "PAOZINHO DO CEU", valor: 4372.18 },
      { codigo: "527", nome: "ALEX SANDRO MAIA DOS SANTOS", valor: 4191.74 },
      { codigo: "3024", nome: "BOUTIQUE DE CARNE", valor: 3630.00 },
      { codigo: "1726", nome: "ROGÉRIO DE ANDRADE BENEDITO", valor: 3467.40 },
      { codigo: "2153", nome: "JOAO PEDRO MARTINS", valor: 2655.51 },
      { codigo: "4967", nome: "SUPERMERCADO PASTORINHO", valor: 2441.55 },
      { codigo: "4907", nome: "MERCADINHO DA VILLA", valor: 2085.01 },
      { codigo: "12", nome: "ADAILTON RODRIGUES DOS SANTOS", valor: 1975.03 },
      { codigo: "4824", nome: "DOCE PRIMUS LOJA 2", valor: 1034.98 },
      { codigo: "2037", nome: "ELAINE MONTEIRO FERREIRA", valor: 1019.38 },
      { codigo: "2692", nome: "GONCALO GENERINO DA SILVA", valor: 945.52 },
      { codigo: "151", nome: "JOSE CARLOS BATISTA DA SILVA (FREE BO)", valor: 907.66 },
      { codigo: "3178", nome: "TAMIRES MINIMERCADO", valor: 906.08 },
      { codigo: "4456", nome: "MERCADO GT", valor: 892.45 }
    ]
  },
  "117": {
    id: "117",
    nome: "Keller",
    faturamentoTotal: 101554.51,
    totalPedidos: 115,
    clientes: [
      { codigo: "211", nome: "NOVA GERAÇÃO LOJA 1", valor: 13419.60 },
      { codigo: "42", nome: "M.A.L DE Q EVANGELISTA MERC", valor: 7906.77 },
      { codigo: "4430", nome: "MERCADINHO OLIVEIRA", valor: 6927.56 },
      { codigo: "908", nome: "LUZIA CARDOSO DA SILVA", valor: 6327.52 },
      { codigo: "2339", nome: "VALDENIA HENRIQUE DA COSTA", valor: 6129.51 },
      { codigo: "4274", nome: "PADARIA DA VILA", valor: 4839.80 },
      { codigo: "4413", nome: "MÃE E FILHA", valor: 4293.66 },
      { codigo: "4289", nome: "PADARIA FERNANDES", valor: 4179.66 },
      { codigo: "4969", nome: "MERCEARIA E ADEGA LOPES", valor: 4120.19 },
      { codigo: "4084", nome: "MERCEARIA VIEIRA", valor: 3368.97 },
      { codigo: "68", nome: "JOSE EVALDO S PAIVA MINIMER", valor: 3337.37 },
      { codigo: "4189", nome: "MERCADO ROSEIRA", valor: 3162.66 },
      { codigo: "4941", nome: "PADARIA SUPREMA PRIME", valor: 3137.53 },
      { codigo: "1814", nome: "SUPERMERCADO TIM TIM", valor: 3020.98 },
      { codigo: "4582", nome: "PADARIA COWBOY", valor: 3019.05 },
      { codigo: "4944", nome: "MULTIPANE PADARIA", valor: 2907.77 },
      { codigo: "4264", nome: "MERCADO AJS", valor: 2885.08 },
      { codigo: "31", nome: "RAEL PEREIRA MENDES", valor: 2332.04 },
      { codigo: "3650", nome: "OTAVIO FRANCISCO DOS SANTOS", valor: 2268.36 },
      { codigo: "4147", nome: "RANCHO NOGUEIRAS", valor: 2126.66 },
      { codigo: "4628", nome: "PADARIA CIDA", valor: 1743.38 },
      { codigo: "2114", nome: "MARIA DO CARMO OLIVEIRA SILVA", valor: 1557.05 },
      { codigo: "1831", nome: "SOLANGE DE ANDRADE FREITAS", valor: 1549.82 },
      { codigo: "4908", nome: "BELLA PANINI PADARIA E MERCEARIA", valor: 1540.16 },
      { codigo: "4351", nome: "MERCADO E PADARIA NEVES", valor: 1442.42 },
      { codigo: "4792", nome: "MERCADINHO DA FAMILIA", valor: 1426.56 },
      { codigo: "3125", nome: "VCJ JACOME", valor: 1125.72 },
      { codigo: "4436", nome: "FRUIT CITY", valor: 1014.00 },
      { codigo: "4945", nome: "RESTAURANTE INCONFIDENCIA MINEIRA", valor: 4444.66 }
    ]
  },
  "107": {
    id: "107",
    nome: "Everaldo",
    faturamentoTotal: 75402.40,
    totalPedidos: 20,
    clientes: [
      { codigo: "4654", nome: "MERCADO TRINDADE", valor: 8748.59 },
      { codigo: "4862", nome: "COMERCIO DO RATINHO", valor: 8324.73 },
      { codigo: "4660", nome: "MERCADO PAGUE MENOS", valor: 6837.09 },
      { codigo: "4665", nome: "SUPERMERCADO IKA", valor: 6531.01 },
      { codigo: "4827", nome: "SABOR DELICIA GUARULHOS LTDA", valor: 6368.36 },
      { codigo: "4639", nome: "HORTIFRUTI MERCEARIA E ACOUGUE BOM S", valor: 5059.36 },
      { codigo: "4730", nome: "SUPERMERCADO FAMILIA", valor: 4738.82 },
      { codigo: "4721", nome: "MERCADINHO JUPI", valor: 4514.12 },
      { codigo: "4956", nome: "MERCADO PAGUE MENOS", valor: 4267.17 },
      { codigo: "4838", nome: "SOMOS SUPERMERCADO", valor: 3601.28 },
      { codigo: "4940", nome: "MERCADINHO NUNES", valor: 3425.55 },
      { codigo: "4775", nome: "EDUARDO JESUS DE SOUSA", valor: 2721.96 },
      { codigo: "4581", nome: "MERCADO HEITOR", valor: 2088.87 },
      { codigo: "4959", nome: "KACULA SUPERMERCADO LTDA", valor: 1478.66 },
      { codigo: "4822", nome: "BAR E MERCEARIAJE", valor: 1438.11 },
      { codigo: "4974", nome: "MERCADO SANTA RITA", valor: 1433.52 },
      { codigo: "4756", nome: "BOM E BARATO SANTANA", valor: 1290.87 },
      { codigo: "4785", nome: "PADARIA PAULISTINHA", valor: 1228.35 },
      { codigo: "4842", nome: "PADARIA E RESTAURANTE KELLY", valor: 735.60 },
      { codigo: "4617", nome: "MERCADO E PADARIAREM LTDA", valor: 570.38 }
    ]
  },
  "119": {
    id: "119",
    nome: "Althieres",
    faturamentoTotal: 66710.21,
    totalPedidos: 27,
    clientes: [
      { codigo: "2826", nome: "COMPRE BEM", valor: 6225.52 },
      { codigo: "4680", nome: "MERCADO HORA CERTA", valor: 5174.33 },
      { codigo: "4927", nome: "SETE MINI MERCADO", valor: 4866.88 },
      { codigo: "2103", nome: "FERREIRA PAES E DOCES", valor: 4305.97 },
      { codigo: "3320", nome: "GR SUPERMERCADOS", valor: 4167.30 },
      { codigo: "3295", nome: "JOSÉ NUNES DOS SANTOS", valor: 3387.40 },
      { codigo: "4630", nome: "AÇOUGUE PATA NEGRA", valor: 3267.28 },
      { codigo: "4820", nome: "PADARIA TEREZINHA", valor: 3203.23 },
      { codigo: "3159", nome: "SOL NASCENTE", valor: 2732.50 },
      { codigo: "2289", nome: "ACOUGUE E MERCEARIA NANDA", valor: 2637.64 },
      { codigo: "2813", nome: "GERLAINE SOUZA MOREIRA CARLOS", valor: 2371.19 },
      { codigo: "3077", nome: "MERCADO T.D. JARDIM JARAGUA", valor: 2343.57 },
      { codigo: "4650", nome: "MERCADO EUCALIPTO LOJA 02", valor: 2235.25 },
      { codigo: "1016", nome: "4 FILHOS VARGEM GRANDE", valor: 2227.98 },
      { codigo: "3952", nome: "DCM MERCADO", valor: 2179.45 },
      { codigo: "3481", nome: "MERCADO EMPORIO EUCALIPTOS", valor: 2029.42 },
      { codigo: "4280", nome: "MERCADO RONDON", valor: 1782.24 },
      { codigo: "4997", nome: "PANIFICADORA VILLAGE", valor: 1682.60 },
      { codigo: "2062", nome: "PADARIA BELLATRIZ", valor: 1600.75 },
      { codigo: "3343", nome: "MERCADO NOGUEIRA", valor: 1418.65 },
      { codigo: "4364", nome: "EMPORIO SANTO ESTEVAO", valor: 1411.08 },
      { codigo: "4985", nome: "WA MERCADO E PADARIA E LANCHONETE", valor: 1290.00 },
      { codigo: "3498", nome: "MARCOS DOS SANTOS", valor: 1170.13 },
      { codigo: "2216", nome: "ROSELIANA DOS SANTOS PAES", valor: 1050.08 },
      { codigo: "2867", nome: "CHARMOSA", valor: 960.00 },
      { codigo: "2366", nome: "LOJA DA ISA", valor: 528.01 },
      { codigo: "4273", nome: "MERCADINHO SOLAR", valor: 461.76 }
    ]
  },
  "118": {
    id: "118",
    nome: "Jorge",
    faturamentoTotal: 39800.59,
    totalPedidos: 12,
    clientes: [
      { codigo: "4848", nome: "FAMILIA VAREJO", valor: 12648.85 },
      { codigo: "59", nome: "MERCADO E MERC.ALIANÇA LTDA", valor: 6849.21 },
      { codigo: "2414", nome: "LOJA ( MERCADO E MERCEARIA ALIANÇA", valor: 5627.75 },
      { codigo: "1140", nome: "JANIO/J.M MINI PADARIA E MERCEARIA", valor: 4125.93 },
      { codigo: "3564", nome: "MERCADO ALIANÇA LOJA 3", valor: 3315.77 },
      { codigo: "1167", nome: "CARLOS ALVES/MERCADO E PADARIA BOM", valor: 1982.30 },
      { codigo: "4388", nome: "MERCADO WALKER", valor: 1301.75 },
      { codigo: "4520", nome: "PADARIA GIRASSOL", valor: 1115.03 },
      { codigo: "4885", nome: "MINI MERCADO PAΡΙТО", valor: 1022.98 },
      { codigo: "4416", nome: "SUPERMERCADO BETE", valor: 787.16 },
      { codigo: "4886", nome: "MERCEARIA CARIOCA", valor: 671.27 },
      { codigo: "4286", nome: "PADARIA BELLA CASA NOVA", valor: 352.59 }
    ]
  }
};

export const VENDEDORES_MAP_ABRIL: Record<string, Omit<SellerOfficialData, 'avatar' | 'maiorCliente'>> = {
  "093": {
    id: "093",
    nome: "Guilherme",
    faturamentoTotal: 440861.66,
    totalPedidos: 198,
    clientes: [
      { codigo: "119", nome: "SAMUEL DE OLIVEIRA CHAGAS", valor: 36371.22 },
      { codigo: "4316", nome: "INTECS CIDADE TIRADENTES", valor: 31608.74 },
      { codigo: "4313", nome: "INTECS JARDIM JARAGUA", valor: 31258.98 },
      { codigo: "4311", nome: "INTECS CITY JARAGUA", valor: 24703.56 },
      { codigo: "4534", nome: "INTECS M BOI MIRIM", valor: 23894.11 },
      { codigo: "4310", nome: "INTECS BRASILANDIA", valor: 21513.04 },
      { codigo: "852", nome: "MERCADO ULTRA ECONOMIA", valor: 21158.76 },
      { codigo: "4314", nome: "INTECS SAO MIGUEL PAULISTA", valor: 19853.86 },
      { codigo: "4136", nome: "MERCADINHO NITEROI", valor: 17084.87 },
      { codigo: "4489", nome: "PLANALTO", valor: 16872.17 },
      { codigo: "4164", nome: "MERCADINHO LUIGI", valor: 15853.13 },
      { codigo: "4315", nome: "INTECS GUAIANASES", valor: 15129.03 },
      { codigo: "4190", nome: "SUPERMERCADOS SEMPRE JUNTO", valor: 13481.35 },
      { codigo: "4063", nome: "MERCADO PERNAMBUCO", valor: 13443.78 },
      { codigo: "4380", nome: "MERCADO PROGRESSO", valor: 12252.17 },
      { codigo: "4701", nome: "MERCADO ALCANTARA", valor: 11368.82 },
      { codigo: "4864", nome: "PADARIA E CONFEITARIA SAO LUIS", valor: 11343.36 },
      { codigo: "3933", nome: "WL SUPERMERCADO JACUTINGA", valor: 11261.34 },
      { codigo: "4726", nome: "MERCADO PRECIOSO", valor: 10250.85 },
      { codigo: "258", nome: "LUIZ JACAREÍ", valor: 9774.85 },
      { codigo: "4336", nome: "MERCADO MICHELITO", valor: 8637.72 },
      { codigo: "781", nome: "OSVALDO XAVIER DE MACEDO JUNIOR", valor: 7729.43 },
      { codigo: "4849", nome: "MERCADO BEM ESTAR", valor: 7146.14 },
      { codigo: "4250", nome: "JM MERCADO", valor: 7020.00 },
      { codigo: "4710", nome: "MERCADO JL", valor: 6978.21 },
      { codigo: "4735", nome: "MERCADO ECONOMIX", valor: 5004.47 },
      { codigo: "4633", nome: "MERCADO ANA MARIA", valor: 3988.41 },
      { codigo: "4387", nome: "MERCADO ICHIBAN", valor: 3760.08 },
      { codigo: "4747", nome: "FABRICA DE ELOGIOS", valor: 3480.44 },
      { codigo: "3382", nome: "MERCADO ΜΑΙΑ", valor: 3192.84 },
      { codigo: "3998", nome: "AÇOUGUE TENESSE", valor: 3166.35 },
      { codigo: "3999", nome: "TENESSE CARNES RAGUEB", valor: 2592.18 },
      { codigo: "4963", nome: "MERCADO PROGRESSO LOJA 02", valor: 2078.70 },
      { codigo: "4000", nome: "TENESSE CARNES GUABIROBA", valor: 1847.95 },
      { codigo: "4012", nome: "MERCADO SAO FRANCISCO DE PAULA", valor: 1404.80 },
      { codigo: "550", nome: "PATRICIA AP. DA SILVA", valor: 1276.09 },
      { codigo: "4964", nome: "MERCADO PROGRESSO LOJA 03", valor: 891.53 },
      { codigo: "4943", nome: "PADARIA DONA BELLA", valor: 868.82 },
      { codigo: "4962", nome: "MERCADO PROGRESSO LOJA 1", valor: 799.51 },
      { codigo: "4826", nome: "PADARIA PAO DE MEL", valor: 520.00 }
    ]
  },
  "094": {
    id: "094",
    nome: "Relson",
    faturamentoTotal: 318310.82,
    totalPedidos: 65,
    clientes: [
      { codigo: "2662", nome: "PEG LEVE", valor: 48712.50 },
      { codigo: "3576", nome: "PADARIA RAIO DE SOL PRA", valor: 21163.30 },
      { codigo: "4544", nome: "JK MERCADINHO E PADARIA", valor: 17773.32 },
      { codigo: "2475", nome: "SALGADO LIMA MINIMERCADO", valor: 15976.22 },
      { codigo: "3663", nome: "MERCEARIA VITORIA", valor: 15677.59 },
      { codigo: "4471", nome: "MAGAZINE CENTRAL", valor: 15581.51 },
      { codigo: "3623", nome: "MINI MERCADO PADARIA ALIANÇA", valor: 13371.69 },
      { codigo: "4331", nome: "PANE DI DIO", valor: 9904.92 },
      { codigo: "4249", nome: "IGOR MENEZES SOUZA", valor: 9659.75 },
      { codigo: "4270", nome: "BOM PREÇO", valor: 9600.07 },
      { codigo: "3160", nome: "MERCADO VIDA", valor: 8869.94 },
      { codigo: "914", nome: "PADARIA E CONFEITARIA PADRÃO", valor: 8822.27 },
      { codigo: "3106", nome: "MERCADO ARAUJO", valor: 8550.40 },
      { codigo: "1105", nome: "BAR E EMPORIO AVAMILENO LTDA ME", valor: 8195.99 },
      { codigo: "3698", nome: "MERCADINHO XAVIER", valor: 6392.28 },
      { codigo: "3934", nome: "MERCADO MASTER", valor: 6389.56 },
      { codigo: "1969", nome: "MINI MERCADO DA FAMILIA", valor: 6072.40 },
      { codigo: "3911", nome: "MINIMERCADO EMPORIO BUONO LTDA", valor: 5853.64 },
      { codigo: "1240", nome: "LUCILENE OSASCO", valor: 5597.31 },
      { codigo: "1904", nome: "SM TRÊS MONTANHAS", valor: 5308.69 },
      { codigo: "4224", nome: "SUPERMERCADO VIDA 2", valor: 5225.15 },
      { codigo: "4597", nome: "LUIZ CARLOS FONSECA", valor: 4837.24 },
      { codigo: "3411", nome: "MINI MERCADO ENZO", valor: 3962.68 },
      { codigo: "4768", nome: "TURMA DA MONICA", valor: 3793.73 },
      { codigo: "4583", nome: "MERCADINHO NOVO LAR", valor: 3659.36 },
      { codigo: "4805", nome: "MALIBU EMPORIO E CONVENIENCIA", valor: 3634.98 },
      { codigo: "4301", nome: "SUPERMERCADO MENK LOJA 2", valor: 3384.95 },
      { codigo: "3311", nome: "PÃES E DOCES MIGUELITO", valor: 3303.19 },
      { codigo: "3969", nome: "SUPERMERCADO MOTA 1", valor: 3299.36 },
      { codigo: "3052", nome: "NUTRITO", valor: 3096.55 },
      { codigo: "3324", nome: "CASA DE FRIOS MUTINGA", valor: 3040.83 },
      { codigo: "3777", nome: "DI PAES BOLOS E LANCHES", valor: 2990.55 },
      { codigo: "4151", nome: "HORTIFRUTI SANTO ANTONIO", valor: 2980.83 },
      { codigo: "4881", nome: "VEM VEM", valor: 2819.55 },
      { codigo: "4152", nome: "SUPERMERCADO MENK LOJA 1", valor: 2724.57 },
      { codigo: "4131", nome: "MERCADO GAMA", valor: 2494.99 },
      { codigo: "4407", nome: "LEONARDO DE OLIVEIRA LIRA", valor: 2460.40 },
      { codigo: "4102", nome: "PADARIA SOPHIE", valor: 2098.96 },
      { codigo: "3924", nome: "SUPERMERCADO DO REI", valor: 1936.06 },
      { codigo: "4087", nome: "BAR E RESTAURANTE JGS", valor: 1893.46 },
      { codigo: "4366", nome: "MINIMERCADO MORAIS", valor: 1361.18 },
      { codigo: "4254", nome: "ADS MINI MERCADO", valor: 1279.20 },
      { codigo: "4788", nome: "MERCADINHO TIO RÔ", valor: 1231.46 },
      { codigo: "4285", nome: "PADARIA EBENEZER", valor: 826.33 },
      { codigo: "2272", nome: "NADIR GONÇALVES GEREMIAS", valor: 724.11 },
      { codigo: "3636", nome: "RESTAURANTE NERIS E QUITANDA", valor: 640.04 },
      { codigo: "4044", nome: "SUPERMERCADO MOTA GUARULHOS", valor: 578.11 },
      { codigo: "4222", nome: "PANIFICADORA ANNA BELLA", valor: 559.65 }
    ]
  },
  "115": {
    id: "115",
    nome: "Israel",
    faturamentoTotal: 97245.40,
    totalPedidos: 45,
    clientes: [
      { codigo: "172", nome: "JOSE ADEILSON", valor: 14302.46 },
      { codigo: "17", nome: "ANA NIVIA PEIXOTO FERREIRA", valor: 13184.72 },
      { codigo: "266", nome: "MERCADO TRINDADE", valor: 12156.52 },
      { codigo: "171", nome: "MINI MERCADO GUSTAVINHO", valor: 7486.43 },
      { codigo: "142", nome: "WANESSA MISSIAS DE SOUZA", valor: 6861.03 },
      { codigo: "4884", nome: "MERCADO SONIA", valor: 5064.58 },
      { codigo: "98", nome: "MINI MERCADO REIS LTDA ME", valor: 5011.65 },
      { codigo: "4893", nome: "MERCADO SOUZA LIMA", valor: 4951.99 },
      { codigo: "4191", nome: "FENIX SUPERMERCADO", valor: 3176.08 },
      { codigo: "4188", nome: "MERCADO DA CARNE SHOP BUTCHER", valor: 3103.60 },
      { codigo: "4874", nome: "NOVA AMERICA GOURMET", valor: 2365.18 },
      { codigo: "4242", nome: "PADARIA DUAS IRMAS", valor: 2217.25 },
      { codigo: "2103", nome: "FERREIRA PAES E DOCES", valor: 2014.67 },
      { codigo: "3481", nome: "MERCADO EMPORIO EUCALIPTOS", valor: 1518.55 },
      { codigo: "4820", nome: "PADARIA TEREZINHA", valor: 1477.74 },
      { codigo: "2289", nome: "ACOUGUE E MERCEARIA NANDA", valor: 1284.25 },
      { codigo: "4906", nome: "HORTIFRUTI INTERLAGOS", valor: 1226.56 },
      { codigo: "4680", nome: "MERCADO HORA CERTA", valor: 1226.35 },
      { codigo: "4904", nome: "PADARIA INTERLAGOS LTDA", valor: 1045.76 },
      { codigo: "4882", nome: "DANIZZA MERCADO", valor: 942.93 },
      { codigo: "3077", nome: "MERCADO T.D. JARDIM JARAGUA", valor: 911.90 },
      { codigo: "3178", nome: "TAMIRES MINIMERCADO", valor: 844.18 },
      { codigo: "2062", nome: "PADARIA BELLATRIZ", valor: 836.24 },
      { codigo: "3498", nome: "MARCOS DOS SANTOS", valor: 693.03 },
      { codigo: "4630", nome: "AÇOUGUE PATA NEGRA", valor: 689.13 },
      { codigo: "4942", nome: "PADARIA DUAS IRMAS 2", valor: 565.08 },
      { codigo: "4650", nome: "MERCADO EUCALIPTO LOJA 02", valor: 551.61 },
      { codigo: "2216", nome: "ROSELIANA DOS SANTOS PAES", valor: 531.05 },
      { codigo: "4934", nome: "MERCADINHO ISRAEL", valor: 529.32 },
      { codigo: "4870", nome: "COMERCIO UNIAO LTDA", valor: 475.56 }
    ]
  },
  "107": {
    id: "107",
    nome: "Everaldo",
    faturamentoTotal: 96541.81,
    totalPedidos: 22,
    clientes: [
      { codigo: "4862", nome: "COMERCIO DO RATINHO", valor: 12558.89 },
      { codigo: "4654", nome: "MERCADO TRINDADE", valor: 12325.46 },
      { codigo: "4660", nome: "MERCADO PAGUE MENOS", valor: 11012.68 },
      { codigo: "4665", nome: "SUPERMERCADO IKA", valor: 9611.48 },
      { codigo: "4639", nome: "HORTIFRUTI MERCEARIA E ACOUGUE BOMS", valor: 7501.11 },
      { codigo: "4730", nome: "SUPERMERCADO FAMILIA", valor: 6792.96 },
      { codigo: "4721", nome: "MERCADINHO JUPI", valor: 6672.36 },
      { codigo: "4838", nome: "SOMOS SUPERMERCADO", valor: 5517.37 },
      { codigo: "4827", nome: "SABOR DELICIA GUARULHOS LTDA", valor: 3142.16 },
      { codigo: "4940", nome: "MERCADINHO NUNES", valor: 3066.11 },
      { codigo: "4785", nome: "PADARIA PAULISTINHA", valor: 2949.99 },
      { codigo: "4756", nome: "BOM E BARATO SANTANA", valor: 2922.16 },
      { codigo: "4775", nome: "EDUARDO JESUS DE SOUSA", valor: 2590.20 },
      { codigo: "4842", nome: "PADARIA E RESTAURANTE KELLY", valor: 2486.52 },
      { codigo: "4956", nome: "MERCADO PAGUE MENOS", valor: 2437.36 },
      { codigo: "4822", nome: "BAR E MERCEARIA JE", valor: 2026.48 },
      { codigo: "4581", nome: "MERCADO HEITOR", valor: 1597.64 },
      { codigo: "4617", nome: "MERCADO E PADARIA RE M LTDA", valor: 1330.88 }
    ]
  },
  "116": {
    id: "116",
    nome: "Natália",
    faturamentoTotal: 87271.21,
    totalPedidos: 24,
    clientes: [
      { codigo: "14", nome: "ADRIANA / JOAO", valor: 16724.25 },
      { codigo: "144", nome: "LEANDRO RIBEIRO PORTO", valor: 10209.35 },
      { codigo: "43", nome: "MANOEL A SOBRINHO-ME", valor: 10099.37 },
      { codigo: "2416", nome: "ÉRICA PORFÍRIO SANTA ROSA FERREIRA", valor: 7538.18 },
      { codigo: "520", nome: "MARA FERREIRA MARQUES", valor: 7517.43 },
      { codigo: "92", nome: "FRANCISCO CANINDÉ DE LUCAS LOJA 02", valor: 6917.31 },
      { codigo: "527", nome: "ALEX SANDRO MAIA DOS SANTOS", valor: 5838.76 },
      { codigo: "1726", nome: "ROGÉRIO DE ANDRADE BENEDITO", valor: 4286.27 },
      { codigo: "12", nome: "ADAILTON RODRIGUES DOS SANTOS", valor: 3136.60 },
      { codigo: "2726", nome: "MERCADO GABRIEL", valor: 2833.72 },
      { codigo: "3024", nome: "BOUTIQUE DE CARNE", valor: 1778.40 },
      { codigo: "151", nome: "JOSE CARLOS BATISTA DA SILVA (FREE BO)", valor: 1361.49 },
      { codigo: "1996", nome: "MERCADO PALACIOS", valor: 1352.06 },
      { codigo: "2750", nome: "PAOZINHO DO CEU", valor: 1279.21 },
      { codigo: "2153", nome: "JOAO PEDRO MARTINS", valor: 1255.53 },
      { codigo: "2037", nome: "ELAINE MONTEIRO FERREIRA", valor: 4822.25 },
      { codigo: "4824", nome: "DOCE PRIMUS LOJA 2", valor: 321.03 }
    ]
  },
  "117": {
    id: "117",
    nome: "Keller",
    faturamentoTotal: 73275.56,
    totalPedidos: 35,
    clientes: [
      { codigo: "42", nome: "M.A.L DE Q EVANGELISTA MERC", valor: 10780.99 },
      { codigo: "4430", nome: "MERCADINHO OLIVEIRA", valor: 9972.73 },
      { codigo: "4582", nome: "PADARIA COWBOY", valor: 4987.85 },
      { codigo: "4289", nome: "PADARIA FERNANDES", valor: 4915.01 },
      { codigo: "4264", nome: "MERCADO AJS", valor: 4895.61 },
      { codigo: "31", nome: "RAEL PEREIRA MENDES", valor: 3702.54 },
      { codigo: "4084", nome: "MERCEARIA VIEIRA", valor: 3592.23 },
      { codigo: "4694", nome: "MERCADO ESMERALDA", valor: 3392.77 },
      { codigo: "4189", nome: "MERCADO ROSEIRA", valor: 3377.05 },
      { codigo: "4628", nome: "PADARIA CIDA", valor: 2986.18 },
      { codigo: "211", nome: "NOVA GERAÇÃO LOJA 1", valor: 2884.62 },
      { codigo: "4351", nome: "MERCADO E PADARIA NEVES", valor: 2864.89 },
      { codigo: "4792", nome: "MERCADINHO DA FAMILIA", valor: 1977.35 },
      { codigo: "4908", nome: "BELLA PANINI PADARIA E MERCEARIA", valor: 1824.50 },
      { codigo: "4147", nome: "RANCHO NOGUEIRAS", valor: 1791.95 },
      { codigo: "4274", nome: "PADARIA DA VILA", valor: 1575.57 },
      { codigo: "1831", nome: "SOLANGE DE ANDRADE FREITAS", valor: 1569.24 },
      { codigo: "4941", nome: "PADARIA SUPREMA PRIME", valor: 1224.30 },
      { codigo: "4413", nome: "MÃE E FILHA", valor: 1095.28 },
      { codigo: "1814", nome: "SUPERMERCADO TIM TIM", valor: 624.21 },
      { codigo: "4969", nome: "MERCEARIA E ADEGA LOPES", valor: 619.55 },
      { codigo: "4929", nome: "MERCADO PROGRESSO", valor: 580.29 },
      { codigo: "68", nome: "JOSE EVALDO S PAIVA MINIMER", valor: 525.69 },
      { codigo: "4944", nome: "MULTIPANE PADARIA", valor: 524.53 },
      { codigo: "4945", nome: "RESTAURANTE INCONFIDENCIA MINEIRA", valor: 522.63 },
      { codigo: "4436", nome: "FRUIT CITY", valor: 468.00 }
    ]
  },
  "119": {
    id: "119",
    nome: "Althieres",
    faturamentoTotal: 0,
    totalPedidos: 0,
    clientes: []
  },
  "118": {
    id: "118",
    nome: "Jorge",
    faturamentoTotal: 0,
    totalPedidos: 0,
    clientes: []
  }
};

const AVATARS: Record<string, string> = {
  "093": "GU",
  "094": "RE",
  "115": "IS",
  "116": "NA",
  "117": "KE",
  "107": "EV",
  "119": "AL",
  "118": "JO"
};

export const VENDEDORES_DATA: SellerOfficialData[] = Object.values(VENDEDORES_MAP_MAIO)
  .map(v => ({
    ...v,
    avatar: AVATARS[v.id] ?? v.nome.slice(0, 2).toUpperCase(),
    maiorCliente: v.clientes[0]?.nome ?? 'Nenhum',
    faturamento: v.faturamentoTotal,
    pedidos: v.totalPedidos
  }))
  .sort((a, b) => b.faturamentoTotal - a.faturamentoTotal);

// ============================================================
// Utilidades
// ============================================================
const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const STATUS_STYLE: Record<AgendaItem['status'], string> = {
  confirmado: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pendente:   'bg-amber-50  text-amber-700  border border-amber-200',
  concluido:  'bg-ice-100   text-ice-600    border border-ice-200',
};
// const STATUS_LABEL: Record<AgendaItem['status'], string> = {
//   confirmado: '✅ Confirmado',
//   pendente:   '⏳ Pendente',
//   concluido:  '🎯 Concluído',
// };

// ============================================================
// KPI Card
// ============================================================
function KpiCard({ label, value, sub, icon, accent, change, positive }: {
  label: string; value: string; sub?: string; icon: string;
  accent: string; change: string; positive: boolean;
}) {
  return (
    <div className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100
      hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm ring-1 ring-black/5 ${accent.split(' ')[0]}`}>{icon}</span>
        </div>
        <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {positive ? '↑' : '↓'} {change}
        </span>
        <span className="text-xs font-medium text-gray-500">vs mês anterior</span>
      </div>
    </div>
  );
}

// ============================================================
// Gráfico de Barras (Faturamento)
// ============================================================
function BarChart({ monthlyBase }: { monthlyBase: number }) {
  const meses = useMemo(() => {
    const base = monthlyBase;
    return [
      { mes: 'Nov', val: Math.round(base * 0.62) },
      { mes: 'Dez', val: Math.round(base * 0.71) },
      { mes: 'Jan', val: Math.round(base * 0.55) },
      { mes: 'Fev', val: Math.round(base * 0.68) },
      { mes: 'Mar', val: Math.round(base * 0.78) },
      { mes: 'Abr', val: Math.round(base * 0.85) },
      { mes: 'Mai', val: base },
    ];
  }, [monthlyBase]);
  const maxVal = Math.max(...meses.map(m => m.val));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-display font-bold text-ice-900">Faturamento Mensal</h3>
          <p className="text-xs text-ice-400 mt-0.5">Evolução dos últimos 7 meses</p>
        </div>
        <select className="text-xs bg-ice-50 border border-ice-200 rounded-lg px-2.5 py-1.5 text-ice-600 cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-wine-300 transition-all">
          <option>2026</option>
          <option>2025</option>
        </select>
      </div>
      <div className="flex items-end gap-2" style={{ height: '130px' }}>
        {meses.map((m) => {
          const pct = Math.round((m.val / maxVal) * 100);
          const isActive = m.mes === 'Mai';
          return (
            <div key={m.mes} className="flex-1 flex flex-col items-center gap-1.5 group/bar">
              {/* Tooltip */}
              <div className="relative w-full flex items-end" style={{ height: '110px' }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover/bar:block
                  text-[9px] font-bold text-ice-600 whitespace-nowrap bg-white border border-ice-200 px-1.5 py-0.5 rounded-md shadow-sm z-10">
                  {fmt(m.val)}
                </div>
                <div
                  className={`w-full rounded-t-lg transition-all duration-700 ${
                    isActive
                      ? 'bg-gradient-to-t from-wine-800 to-wine-500'
                      : 'bg-gradient-to-t from-wine-200/70 to-wine-100/40 group-hover/bar:from-wine-300/80'
                  }`}
                  style={{ height: `${pct}%` }}
                />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-wine-600' : 'text-ice-400'}`}>{m.mes}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Agenda
// ============================================================
function AgendaSection({ items, onUpdateStatus }: {
  items: AgendaItem[];
  onUpdateStatus: (id: string, status: AgendaItem['status']) => void;
}) {
  const today = new Date().toISOString().split('T')[0];
  const todayItems = items.filter(i => i.data >= today).slice(0, 7);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-5 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-display font-bold text-ice-900">Agenda da Semana</h3>
          <p className="text-xs text-ice-400 mt-0.5">{todayItems.length} compromisso(s) próximos</p>
        </div>
        <span className="text-xs font-semibold text-wine-600 bg-wine-50/80 border border-wine-100/50 px-3 py-1 rounded-xl shadow-sm">
          {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
        </span>
      </div>

      <div className="divide-y divide-ice-100/50 flex-1 overflow-y-auto">
        {todayItems.length === 0 ? (
          <div className="px-6 py-12 text-center my-auto">
            <p className="text-3xl mb-2">📅</p>
            <p className="text-sm font-medium text-ice-500">Nenhum compromisso agendado</p>
            <p className="text-xs text-ice-400 mt-1">Registre um atendimento para começar</p>
          </div>
        ) : todayItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-ice-50/50 transition-colors group">
            {/* Bloco de Data e Hora - Alinhado à esquerda */}
            <div className="shrink-0 flex items-center gap-2.5 w-[110px]">
              <span className="text-xs font-bold text-wine-800 bg-wine-50/80 border border-wine-100/60 px-2 py-0.5 rounded-lg shadow-sm">
                {item.hora}
              </span>
              <span className="text-[10px] font-semibold text-ice-400 whitespace-nowrap uppercase tracking-wider">
                {new Date(item.data + 'T12:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </span>
            </div>
            
            {/* Bloco Central - Cliente + Produto em formato flex expandido */}
            <div className="flex-1 min-w-0 flex items-center justify-between gap-6">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ice-900 truncate group-hover:text-wine-800 transition-colors">{item.cliente}</p>
                <p className="text-xs text-ice-400 mt-0.5 truncate font-normal leading-relaxed">{item.tipo}</p>
              </div>
              
              {/* Bloco de Ação - Valor + Dropdown de Status Lado a Lado */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-bold text-ice-800 tabular-nums">{fmt(item.valor)}</span>
                <select
                  value={item.status}
                  onChange={(e) => onUpdateStatus(item.id, e.target.value as AgendaItem['status'])}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full cursor-pointer border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-wine-300 transition-all ${STATUS_STYLE[item.status]}`}
                >
                  <option value="confirmado">✅ Confirmado</option>
                  <option value="pendente">⏳ Pendente</option>
                  <option value="concluido">🎯 Concluído</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// ============================================================
// Desempenho por Profissional (Vendedores Oficiais)
// ============================================================
function DesempenhoProfissional({ 
  onSelectVendedor, 
  vendedoresList = VENDEDORES_DATA,
  periodLabel = "01/05 a 23/05"
}: { 
  onSelectVendedor: (v: SellerOfficialData) => void;
  vendedoresList?: SellerOfficialData[];
  periodLabel?: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-display font-bold text-ice-900">Desempenho por Profissional</h3>
          <p className="text-xs text-ice-400 mt-0.5">Faturamento real acumulado ({periodLabel})</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-wine-600 bg-wine-50 px-2.5 py-1 rounded-full border border-wine-100">
          {vendedoresList.length} Vendedores
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendedoresList.map((p, i) => {
          const leaderFaturamento = vendedoresList[0]?.faturamentoTotal ?? 1;
          const pct = Math.round((p.faturamentoTotal / leaderFaturamento) * 100);
          return (
            <div
              key={p.id}
              onClick={() => onSelectVendedor(p)}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-50 bg-gray-50/10 hover:bg-wine-50/20 hover:border-wine-100/50 cursor-pointer transition-all duration-200 group animate-[fadeIn_0.3s_ease]"
            >
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-wine-50 to-wine-100/80 group-hover:from-wine-100 group-hover:to-wine-200 flex items-center justify-center text-wine-800 font-bold text-xs shadow-sm ring-1 ring-wine-900/5 transition-all">
                  {p.avatar}
                </div>
                {i === 0 && (
                  <div className="absolute -top-1.5 -right-1.5 text-xs leading-none">🥇</div>
                )}
                {i === 1 && (
                  <div className="absolute -top-1.5 -right-1.5 text-xs leading-none">🥈</div>
                )}
                {i === 2 && (
                  <div className="absolute -top-1.5 -right-1.5 text-xs leading-none">🥉</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-ice-900 truncate group-hover:text-wine-950 transition-colors">
                    {p.nome} <span className="text-[10px] font-normal text-ice-400">({p.id})</span>
                  </span>
                  <span className="text-xs font-extrabold text-wine-700 ml-2 tabular-nums">{fmt(p.faturamentoTotal)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-ice-100/70 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-wine-700 to-wine-400 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-wine-600 shrink-0">{pct}%</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[10px] text-ice-400 font-medium">{p.totalPedidos} pedidos</p>
                  <p className="text-[9px] text-wine-600 font-semibold group-hover:underline">Ver Carteira →</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Meta do Vendedor (Consistente com Faturamento Oficial)
// ============================================================
function MetaVendedor({ 
  items, 
  meta = 50000, 
  userId,
  vendedoresList = VENDEDORES_DATA,
  periodLabel = "Maio 2026"
}: { 
  items: AgendaItem[]; 
  meta?: number; 
  userId: string;
  vendedoresList?: SellerOfficialData[];
  periodLabel?: string;
}) {
  const currentSeller = vendedoresList.find(v => v.id === userId);
  const myItems = items.filter(i => i.vendedorId === userId && i.status === 'concluido');
  const atual = useMemo(() => {
    if (currentSeller) return currentSeller.faturamentoTotal;
    return myItems.reduce((s, i) => s + i.valor, 12500);
  }, [currentSeller, myItems]);
  const pct = Math.min(Math.round((atual / meta) * 100), 100);
  const faltam = Math.max(meta - atual, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-[fadeIn_0.35s_ease]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-display font-bold text-ice-900">Minha Meta Mensal</h3>
          <p className="text-xs text-ice-400 mt-0.5">{periodLabel} · {currentSeller ? currentSeller.totalPedidos : myItems.length + 3} atendimentos/pedidos realizados</p>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-display font-black ${pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
            {pct}%
          </span>
        </div>
      </div>
      <div className="w-full bg-ice-100 rounded-full h-3 mb-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ${
            pct >= 80 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
            : pct >= 50 ? 'bg-gradient-to-r from-amber-600 to-amber-400'
            : 'bg-gradient-to-r from-red-600 to-red-400'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-ice-500">Realizado</p>
          <p className="text-sm font-bold text-ice-900">{fmt(atual)}</p>
        </div>
        <div className="text-center">
          {faltam > 0 ? (
            <>
              <p className="text-xs text-ice-500">Faltam</p>
              <p className="text-sm font-bold text-amber-600">{fmt(faltam)}</p>
            </>
          ) : (
            <span className="text-sm font-bold text-emerald-600 font-display">🎯 Meta atingida!</span>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-ice-500">Meta Total</p>
          <p className="text-sm font-bold text-ice-900">{fmt(meta)}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Procedimentos (Produtos mais vendidos)
// ============================================================
// function ProdutosMaisVendidos({ items }: { items: AgendaItem[] }) {
//   const produtos = useMemo(() => {
//     const map: Record<string, { count: number; total: number }> = {};
//     items.forEach(i => {
//       if (!map[i.tipo]) map[i.tipo] = { count: 0, total: 0 };
//       map[i.tipo].count += 1;
//       map[i.tipo].total += i.valor;
//     });
//     // Adiciona dados base
//     const base = [
//       { nome: 'Pão Francês Congelado', count: 41, total: 18200 },
//       { nome: 'Croissant Premium',     count: 30, total: 10940 },
//       { nome: 'Baguete Artesanal',     count: 24, total: 7480  },
//       { nome: 'Mix Pães Especiais',    count: 22, total: 5500  },
//     ];
//     return base.map(b => ({
//       nome: b.nome,
//       count: b.count + (map[b.nome]?.count ?? 0),
//       total: b.total + (map[b.nome]?.total ?? 0),
//     })).sort((a, b) => b.total - a.total);
//   }, [items]);
// 
//   const maxTotal = Math.max(...produtos.map(p => p.total));
// 
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <div className="mb-5">
//         <h3 className="text-sm font-display font-bold text-ice-900">Produtos Mais Vendidos</h3>
//         <p className="text-xs text-ice-400 mt-0.5">Baseado nos registros do mês</p>
//       </div>
//       <div className="space-y-4">
//         {produtos.map((p, i) => (
//           <div key={p.nome} className="group">
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center gap-2">
//                 <span className="text-[10px] font-bold text-ice-400 w-4 tabular-nums">#{i+1}</span>
//                 <span className="text-sm font-medium text-ice-800">{p.nome}</span>
//               </div>
//               <div className="text-right">
//                 <span className="text-xs text-ice-400">{p.count} pedidos · </span>
//                 <span className="text-xs font-bold text-ice-700">{fmt(p.total)}</span>
//               </div>
//             </div>
//             <div className="w-full bg-ice-100 rounded-full h-2 overflow-hidden">
//               <div
//                 className="h-2 rounded-full bg-gradient-to-r from-wine-600 to-wine-400 transition-all duration-700 group-hover:from-wine-700"
//                 style={{ width: `${Math.round((p.total / maxTotal) * 100)}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// ============================================================
// Banner de permissão restrita
// ============================================================
function PermissionBanner({ role }: { role: string }) {
  const msgs: Record<string, { icon: string; msg: string }> = {
    VENDEDOR: { icon: '💼', msg: 'Você está vendo apenas seus próprios atendimentos e meta comercial.' },
    TECNICO: { icon: '🔧', msg: 'Você está vendo apenas a agenda de atendimentos técnicos da semana.' },
  };
  const info = msgs[role];
  if (!info) return null;
  return (
    <div className="flex items-center gap-3 bg-white border border-wine-200 rounded-xl px-5 py-4 shadow-sm">
      <span className="text-2xl shrink-0">{info.icon}</span>
      <div>
        <p className="text-sm font-semibold text-wine-900">Visão restrita ao perfil {role}</p>
        <p className="text-xs text-wine-600 mt-0.5">{info.msg}</p>
      </div>
    </div>
  );
}

// ============================================================
// Dashboard principal
// ============================================================
export default function Dashboard({ activeTab }: { activeTab: string }) {
  const { hasPermission, currentUser } = useAuth();
  const { agendaItems, updateItemStatus } = useDashboard();
  const [selectedVendedor, setSelectedVendedor] = useState<SellerOfficialData | null>(null);
  const [selectedAnaliseSellerId, setSelectedAnaliseSellerId] = useState<string>(
    currentUser?.role === 'VENDEDOR' ? currentUser.id : '093'
  );
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'maio' | 'abril'>('maio');

  if (!currentUser) return null;

  // ---- Seleção dinâmica da base de dados com base no período ----
  const vendedoresMap = selectedPeriod === 'maio' ? VENDEDORES_MAP_MAIO : VENDEDORES_MAP_ABRIL;

  const vendedoresList: SellerOfficialData[] = Object.values(vendedoresMap)
    .map(v => ({
      ...v,
      avatar: AVATARS[v.id] ?? v.nome.slice(0, 2).toUpperCase(),
      maiorCliente: v.clientes[0]?.nome ?? 'Nenhum',
      faturamento: v.faturamentoTotal,
      pedidos: v.totalPedidos
    }))
    .sort((a, b) => b.faturamentoTotal - a.faturamentoTotal);

  const activeSelectedVendedor = selectedVendedor 
    ? vendedoresList.find(v => v.id === selectedVendedor.id) || null
    : null;

  // ---- Dados computados por role ----
  const myItems = agendaItems.filter(i => {
    if (!hasPermission('canViewAllLeads')) {
      // Vendedor e Técnico: só os seus
      return i.vendedorId === currentUser.id;
    }
    return true;
  });

  const currentSellerInfo = vendedoresList.find(v => v.id === currentUser.id);

  const totalFaturamento = hasPermission('canViewFullRevenue')
    ? vendedoresList.reduce((sum, v) => sum + v.faturamentoTotal, 0)
    : (currentSellerInfo?.faturamentoTotal ?? 32500) + myItems.filter(i => i.status === 'concluido' && i.id.startsWith('new-')).reduce((s, i) => s + i.valor, 0);

  const totalLeads = hasPermission('canViewAllLeads')
    ? 150 + myItems.filter(i => i.id.startsWith('new-')).length
    : Math.round((currentSellerInfo?.totalPedidos ?? 10) * 1.5) + myItems.filter(i => i.id.startsWith('new-')).length;

  // Se estiver na aba Agendas
  if (activeTab === 'agenda') {
    return (
      <div className="animate-[fadeIn_0.35s_ease] h-[calc(100vh-12rem)] min-h-[500px]">
        <AgendaSection items={myItems} onUpdateStatus={updateItemStatus} />
      </div>
    );
  }

  // Se estiver na aba Google Forms
  if (activeTab === 'forms') {
    return (
      <div className="animate-[fadeIn_0.35s_ease] space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
          <div className="mb-6 border-b border-gray-100 pb-5">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              📝 Relatório de Visita Técnica & Comercial
            </h2>
            <p className="text-xs text-gray-500 mt-1">Este formulário simula o envio de relatórios comerciais e visitas técnicas para o Google Sheets/Forms da Valochi Sousa.</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); alert('Relatório enviado com sucesso!'); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Nome do Vendedor</label>
                <input type="text" readOnly value={currentUser.name} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-100 bg-gray-50 text-gray-700 font-semibold focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Cargo / Perfil</label>
                <input type="text" readOnly value={currentUser.role} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-100 bg-gray-50 text-gray-700 font-semibold focus:outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Cliente / Estabelecimento</label>
              <input type="text" required placeholder="Ex: Panificadora Alfa, Mercadinho Silva..." className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Data da Visita</label>
                <input type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Tipo de Atendimento</label>
                <select className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all cursor-pointer">
                  <option>Visita Comercial de Vendas</option>
                  <option>Acompanhamento Técnico (Padeiro)</option>
                  <option>Entrega de Amostras de Pães</option>
                  <option>Auditoria / Cobrança</option>
                  <option>Outros</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Observações da Visita / Diagnóstico</label>
              <textarea rows={4} placeholder="Descreva os pontos abordados, interesse em pão francês congelado, croissants, baguetes ou problemas com o forno/P&D..." className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all resize-none" />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wine-800 to-wine-600 hover:from-wine-700 hover:to-wine-500 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer">
              Enviar Formulário de Visita
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Se estiver na aba Análise de Desempenho
  if (activeTab === 'analise') {
    const isManager = hasPermission('canViewTeamPerformance');
    
    // Recupera dados do vendedor selecionado na aba Análise
    const seller = vendedoresMap[selectedAnaliseSellerId] || vendedoresMap['093'];
    
    // Filtragem instantânea dos clientes da carteira
    const filteredClientes = seller.clientes.filter(c => {
      const q = clientSearchQuery.trim().toLowerCase();
      if (!q) return true;
      return c.nome.toLowerCase().includes(q) || c.codigo.toLowerCase().includes(q);
    });

    // Encontra maior cliente da carteira do vendedor atual
    const maiorCliente = seller.clientes[0]?.nome ?? 'Nenhum';

    return (
      <div className="animate-[fadeIn_0.35s_ease] space-y-6">
        {/* Header explicativo com Seletor de Período */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-ice-900 flex items-center gap-2">
              📊 Análise de Carteiras Comerciais
            </h2>
            <p className="text-xs text-ice-500 mt-1">
              {isManager 
                ? "Painel Gerencial de auditoria de faturamento, pedidos e clientes por profissional." 
                : "Auditoria pessoal de faturamento real acumulado e clientes ativos no período."}
            </p>
          </div>
          
          {/* Segmented Control de Período */}
          <div className="flex bg-ice-100/80 p-1 rounded-xl border border-ice-200/50 shadow-inner shrink-0 self-start sm:self-auto">
            <button
              onClick={() => {
                setSelectedPeriod('maio');
                setClientSearchQuery('');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                selectedPeriod === 'maio'
                  ? 'bg-wine-900 text-white shadow-sm ring-1 ring-wine-800/10'
                  : 'text-ice-500 hover:text-wine-800'
              }`}
            >
              Maio 2026 (01 a 23/05)
            </button>
            <button
              onClick={() => {
                setSelectedPeriod('abril');
                setClientSearchQuery('');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                selectedPeriod === 'abril'
                  ? 'bg-wine-900 text-white shadow-sm ring-1 ring-wine-800/10'
                  : 'text-ice-500 hover:text-wine-800'
              }`}
            >
              Abril 2026 (Fechado)
            </button>
          </div>
        </div>

        {/* Layout Mestre-Detalhe (2 colunas para gerente/supervisor/analista, 1 coluna w-full para vendedores) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* PAINEL MESTRE: Lista de Vendedores (Apenas para Gerência/Supervisão/Análise) */}
          {isManager ? (
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Equipe Comercial
                  </h3>
                  <span className="text-[10px] font-bold text-wine-800 bg-wine-50 px-2 py-0.5 rounded-md">
                    {vendedoresList.length} Profissionais
                  </span>
                </div>
                
                {/* Lista de Vendedores */}
                <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                  {vendedoresList.map((p) => {
                    const isSelected = p.id === selectedAnaliseSellerId;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedAnaliseSellerId(p.id);
                          setClientSearchQuery(''); // reseta a busca ao mudar de vendedor
                        }}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 group
                          ${isSelected 
                            ? 'bg-wine-900 border-wine-900 text-white shadow-md shadow-wine-900/10' 
                            : 'bg-white border-gray-100 hover:bg-wine-50/10 hover:border-wine-200/50'
                          }`}
                      >
                        <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm transition-colors
                          ${isSelected 
                            ? 'bg-white/20 text-white' 
                            : 'bg-wine-50 text-wine-800 group-hover:bg-wine-100'
                          }`}
                        >
                          {p.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-gray-900 group-hover:text-wine-900'}`}>
                              {p.nome}
                            </span>
                            <span className={`text-[9px] font-mono shrink-0 ml-1.5 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                              #{p.id}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className={`text-[10px] tabular-nums font-semibold ${isSelected ? 'text-white/80' : 'text-wine-800'}`}>
                              {fmt(p.faturamentoTotal)}
                            </span>
                            <span className={`text-[9px] ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>
                              {p.totalPedidos} ped.
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {/* PAINEL DETALHE: Carteira de Clientes do Vendedor Selecionado */}
          <div className={`${isManager ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
            
            {/* Header da Carteira + Métricas */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
              
              {/* Vendedor Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-wine-800 to-wine-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
                    {AVATARS[seller.id] ?? seller.nome.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-gray-900">Carteira de {seller.nome}</h3>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                        Vendedor #{seller.id}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Faturamento e portfólio comercial de 01 a 23 de Maio
                    </p>
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-3.5 py-1.5 rounded-xl border border-gray-150/60 self-start sm:self-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-wine-600 animate-pulse" />
                  Top Cliente: <span className="text-wine-850 font-bold max-w-[120px] truncate ml-1">{maiorCliente}</span>
                </div>
              </div>

              {/* KPIs Internos da Carteira */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* KPI Faturamento */}
                <div className="bg-gradient-to-br from-gray-50/50 to-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-lg bg-wine-50 text-wine-800 flex items-center justify-center text-base shadow-xs shrink-0">
                    💰
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Faturamento</p>
                    <p className="text-sm font-extrabold text-wine-900 mt-0.5 tabular-nums">
                      {fmt(seller.faturamentoTotal)}
                    </p>
                  </div>
                </div>

                {/* KPI Pedidos */}
                <div className="bg-gradient-to-br from-gray-50/50 to-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-lg bg-wine-50 text-wine-800 flex items-center justify-center text-base shadow-xs shrink-0">
                    📦
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total de Pedidos</p>
                    <p className="text-sm font-extrabold text-gray-800 mt-0.5 tabular-nums">
                      {seller.totalPedidos} pedidos
                    </p>
                  </div>
                </div>

                {/* KPI Ticket Médio */}
                <div className="bg-gradient-to-br from-gray-50/50 to-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3.5 shadow-sm">
                  <span className="w-9 h-9 rounded-lg bg-wine-50 text-wine-800 flex items-center justify-center text-base shadow-xs shrink-0">
                    📈
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ticket Médio / Pedido</p>
                    <p className="text-sm font-extrabold text-gray-800 mt-0.5 tabular-nums">
                      {seller.totalPedidos > 0 ? fmt(seller.faturamentoTotal / seller.totalPedidos) : fmt(0)}
                    </p>
                  </div>
                </div>

              </div>

              {/* Barra de Busca + Contagem */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Filtrar cliente por nome ou código..."
                    value={clientSearchQuery}
                    onChange={(e) => setClientSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all shadow-xs"
                  />
                  {clientSearchQuery && (
                    <button
                      onClick={() => setClientSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-wine-800"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-150/60 px-3.5 py-2 rounded-xl shrink-0 self-start sm:self-auto shadow-xs">
                  Listando: <span className="text-wine-850 font-bold">{filteredClientes.length}</span> de <span className="font-bold text-gray-700">{seller.clientes.length}</span> clientes
                </div>
              </div>

              {/* Tabela de Carteira de Clientes Completa */}
              <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden bg-white">
                <div className="max-h-[460px] overflow-y-auto scrollbar-thin">
                  <table className="w-full border-collapse text-left text-xs text-gray-600">
                    <thead className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-xs">
                      <tr>
                        <th scope="col" className="px-5 py-3.5 font-bold text-gray-500 uppercase tracking-wider w-[140px]">
                          Código do Cliente
                        </th>
                        <th scope="col" className="px-5 py-3.5 font-bold text-gray-500 uppercase tracking-wider">
                          Nome do Cliente
                        </th>
                        <th scope="col" className="px-5 py-3.5 font-bold text-gray-500 uppercase tracking-wider text-right w-[180px]">
                          Faturamento no Período
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredClientes.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-16 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-3xl mb-2">🔍</span>
                              <p className="text-sm font-semibold text-gray-700">Nenhum cliente encontrado</p>
                              <p className="text-xs text-gray-400 mt-1 max-w-[280px]">
                                Não encontramos resultados para "{clientSearchQuery}" nesta carteira comercial.
                              </p>
                              <button
                                onClick={() => setClientSearchQuery('')}
                                className="mt-4 px-4 py-2 text-xs font-bold text-wine-800 bg-wine-50 border border-wine-100 rounded-xl hover:bg-wine-100 transition-colors"
                              >
                                Limpar Busca
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredClientes.map((c, idx) => {
                          const isTop = c.nome === maiorCliente;
                          return (
                            <tr 
                              key={c.codigo} 
                              className={`hover:bg-wine-50/5 transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'}`}
                            >
                              <td className="px-5 py-3.5 font-mono text-gray-400 font-semibold select-all">
                                {c.codigo}
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isTop ? 'bg-wine-600 animate-pulse' : 'bg-gray-300'}`} />
                                  <span className={`font-semibold text-gray-800 truncate uppercase max-w-[280px] sm:max-w-none ${isTop ? 'text-wine-900 font-bold' : ''}`}>
                                    {c.nome}
                                  </span>
                                  {isTop && (
                                    <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-wine-50 text-wine-850 rounded border border-wine-100/50 shrink-0">
                                      Líder
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-5 py-3.5 text-right font-bold text-wine-950 tabular-nums select-all">
                                {fmt(c.valor)}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.35s_ease]">
      {/* Top Header com Seletor de Período */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-ice-900">
            📊 Painel Comercial Valochi Sousa
          </h2>
          <p className="text-xs text-ice-500 mt-1">
            {hasPermission('canViewFullRevenue') 
              ? "Visão geral consolidada de faturamento, metas e portfólio da equipe."
              : `Olá, ${currentUser.name}! Acompanhe seu desempenho individual e clientes ativos.`}
          </p>
        </div>
        
        {/* Segmented Control de Período */}
        <div className="flex bg-ice-100/80 p-1 rounded-xl border border-ice-200/50 shadow-inner shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setSelectedPeriod('maio')}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              selectedPeriod === 'maio'
                ? 'bg-wine-900 text-white shadow-md ring-1 ring-wine-800/10'
                : 'text-ice-500 hover:text-wine-800'
            }`}
          >
            Maio 2026 (01 a 23/05)
          </button>
          <button
            onClick={() => setSelectedPeriod('abril')}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              selectedPeriod === 'abril'
                ? 'bg-wine-900 text-white shadow-md ring-1 ring-wine-800/10'
                : 'text-ice-500 hover:text-wine-800'
            }`}
          >
            Abril 2026 (Fechado)
          </button>
        </div>
      </div>

      {/* Banner de permissão */}
      {(!hasPermission('canViewFullRevenue')) && (
        <PermissionBanner role={currentUser.role} />
      )}

      {/* Meta do Vendedor */}
      {hasPermission('canViewOwnMeta') && (
        <MetaVendedor 
          items={agendaItems} 
          meta={currentUser.meta} 
          userId={currentUser.id} 
          vendedoresList={vendedoresList}
          periodLabel={selectedPeriod === 'maio' ? 'Maio 2026' : 'Abril 2026'}
        />
      )}

      {/* KPIs — Visão Gerencial Consolidada (3 Colunas) */}
      {hasPermission('canViewFullRevenue') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <KpiCard
            label="Faturamento Período"
            value={fmt(totalFaturamento)}
            icon="💰"
            accent="bg-wine-50 text-wine-700"
            change="+12%"
            positive
          />
          <KpiCard
            label="Lucro Líquido (Est.)"
            value={fmt(totalFaturamento * 0.60)}
            icon="📈"
            accent="bg-wine-50 text-wine-700"
            change="+8%"
            positive
          />
          <KpiCard
            label="Leads Ativos"
            value={totalLeads.toString()}
            icon="🧲"
            accent="bg-wine-50 text-wine-700"
            change="+15"
            positive
          />
        </div>
      )}

      {/* Layout variável por permissão */}
      {hasPermission('canViewWeeklyAgenda') && (
        <>
          {/* Gráfico de Faturamento Mensal — agora em largura total */}
          {hasPermission('canViewFullRevenue') && (
            <div className="w-full mt-6">
              <BarChart monthlyBase={Math.round(totalFaturamento)} />
            </div>
          )}

          {/* Desempenho por Profissional — em largura total */}
          {hasPermission('canViewTeamPerformance') && (
            <div className="w-full mt-8">
              <DesempenhoProfissional 
                onSelectVendedor={setSelectedVendedor} 
                vendedoresList={vendedoresList}
                periodLabel={selectedPeriod === 'maio' ? "01/05 a 23/05" : "Mês Fechado"}
              />
            </div>
          )}
        </>
      )}

      {/* Técnico: orientação para acessar aba de agendas */}
      {!hasPermission('canViewOwnStats') && hasPermission('canViewWeeklyAgenda') && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto text-center my-8">
          <p className="text-4xl mb-3">📅</p>
          <h3 className="text-sm font-bold text-ice-900">Agenda Técnica e Comercial</h3>
          <p className="text-xs text-ice-500 mt-1 max-w-md mx-auto">Para visualizar seu cronograma completo de compromissos, visitas técnicas e atendimentos da semana, por favor acesse a aba **Agendas** no menu lateral esquerdo.</p>
        </div>
      )}

      {/* Modal de Carteira de Clientes */}
      {activeSelectedVendedor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedVendedor(null)}
            className="absolute inset-0 bg-wine-950/40 backdrop-blur-md transition-opacity duration-300"
          />
          
          <div className="relative bg-white rounded-[32px] p-7 max-w-lg w-full border border-wine-100 shadow-[0_25px_60px_rgba(74,14,23,0.18)] z-10 overflow-hidden animate-[slideUp_0.25s_ease-out]">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wine-800 via-wine-600 to-wine-400" />
            
            <div className="flex items-start gap-4 mb-6 mt-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-wine-50 to-wine-100 flex items-center justify-center text-wine-900 font-black font-display text-lg shadow-sm border border-wine-200/50">
                {activeSelectedVendedor.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-ice-900 truncate">{activeSelectedVendedor.nome}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Vendedor
                  </span>
                </div>
                <p className="text-xs font-semibold text-wine-600/80 mt-0.5">Código do Profissional: #{activeSelectedVendedor.id}</p>
              </div>
              <button
                onClick={() => setSelectedVendedor(null)}
                className="text-ice-400 hover:text-wine-800 transition-colors p-1 rounded-lg hover:bg-ice-50"
                aria-label="Fechar"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-ice-50/50 border border-ice-100 p-3.5 rounded-2xl">
                <p className="text-[10px] font-bold text-ice-400 uppercase tracking-wider">Faturamento Período</p>
                <p className="text-base font-extrabold text-wine-900 mt-1">{fmt(activeSelectedVendedor.faturamentoTotal)}</p>
                <p className="text-[9px] text-ice-500 mt-0.5">{selectedPeriod === 'maio' ? "01/05 a 23/05" : "Abril 2026"}</p>
              </div>
              <div className="bg-ice-50/50 border border-ice-100 p-3.5 rounded-2xl">
                <p className="text-[10px] font-bold text-ice-400 uppercase tracking-wider">Total de Pedidos</p>
                <p className="text-base font-extrabold text-ice-900 mt-1">{activeSelectedVendedor.totalPedidos} pedidos</p>
                <p className="text-[9px] text-ice-500 mt-0.5">Clientes atendidos</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-bold text-ice-800 uppercase tracking-wider">Principais Clientes da Carteira</p>
                <span className="text-[10px] font-semibold text-wine-600 bg-wine-50/60 px-2 py-0.5 rounded-md">
                  Maior: {activeSelectedVendedor.maiorCliente}
                </span>
              </div>

              <div className="max-h-48 overflow-y-auto pr-1 space-y-2.5 divide-y divide-ice-100/50">
                {activeSelectedVendedor.clientes.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center pt-2.5 first:pt-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.nome === activeSelectedVendedor.maiorCliente ? 'bg-wine-600 animate-pulse' : 'bg-ice-300'}`} />
                      <span className={`text-xs font-semibold ${c.nome === activeSelectedVendedor.maiorCliente ? 'text-wine-900 font-bold' : 'text-ice-800'}`}>
                        {c.nome}
                      </span>
                      {c.nome === activeSelectedVendedor.maiorCliente && (
                        <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-wine-100 text-wine-800 rounded">
                          Foco / Top
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-ice-700 tabular-nums">{fmt(c.valor)}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedVendedor(null)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-wine-800 to-wine-600 hover:from-wine-700 hover:to-wine-500 text-white font-bold text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
            >
              Entendido / Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
