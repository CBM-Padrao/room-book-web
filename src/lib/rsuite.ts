import ptBR from 'date-fns/locale/pt-BR';

const DateTimeFormats = {
  sunday: 'Dom',
  monday: 'Seg',
  tuesday: 'Tet',
  wednesday: 'Qua',
  thursday: 'Qui',
  friday: 'Ses',
  saturday: 'Sab',
  ok: 'OK',
  today: 'Hoje',
  yesterday: 'Ontem',
  now: 'Agora',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
  formattedMonthPattern: 'MMMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  shortDateFormat: 'dd/MM/yyyy',
  shortTimeFormat: 'HH:mm',
  dateLocale: ptBR
};

const Combobox = {
  noResultsText: 'Nenhum resultado encontrado',
  placeholder: 'Selecionar',
  searchPlaceholder: 'Buscar',
  checkAll: 'Todos'
};

const CreatableComboBox = {
  ...Combobox,
  newItem: 'Novo item',
  createOption: 'Criar opção "{0}"'
};

export const locale = {
  code: 'pt-BR',
  common: {
    loading: 'Carregando...',
    emptyMessage: 'Nenhum dado encontrado',
    remove: 'Remover',
    clear: 'Limpar'
  },
  Plaintext: {
    unfilled: 'Não preenchido',
    notSelected: 'Não selecionado',
    notUploaded: 'Não carregado'
  },
  Pagination: {
    more: 'Mais',
    prev: 'Anterior',
    next: 'Próximo',
    first: 'Primeiro',
    last: 'Último',
    limit: '{0} / página',
    total: 'Total de Linhas: {0}',
    skip: 'Ir para {0}'
  },
  DateTimeFormats,
  Calendar: DateTimeFormats,
  DatePicker: DateTimeFormats,
  DateRangePicker: {
    ...DateTimeFormats,
    last7Days: 'Últimos 7 Dias'
  },
  Combobox,
  InputPicker: CreatableComboBox,
  TagPicker: CreatableComboBox,
  Uploader: {
    inited: 'Inicial',
    progress: 'Carregando',
    error: 'Erro',
    complete: 'Concluído',
    emptyFile: 'Vazio',
    upload: 'Enviar',
    removeFile: 'Remover arquivo'
  },
  CloseButton: {
    closeLabel: 'Fechar'
  },
  Breadcrumb: {
    expandText: 'Mostrar caminho'
  },
  Toggle: {
    on: 'Abrir',
    off: 'Fechar'
  }
};
