export type Requisite = {
  label: string;
  value: string;
};

export const requisites: Requisite[] = [
  { label: 'Наименование', value: 'Павлов Матвей Ильич, самозанятый' },
  { label: 'ИНН', value: '583522061051' },
  { label: 'Юридический адрес', value: '440008, г. Пенза, ул. Бакунина, д. 137' },
  { label: 'Почта для документов', value: 'mail@emostr.com' }
];

export function requisitesText() {
  return requisites.map(({ label, value }) => `${label}: ${value}`).join('\n');
}
