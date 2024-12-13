export declare class CreateVisitDto {
    clinic_id: string;
    client_id: string;
    visit_date: string;
    stay_type: 'outpatient' | 'hospital';
    total_balance: number;
    discount: number;
}
