import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MainMenuComponent } from "./main_menu.component";

describe('MainMenuComponent', () => {
    let fixture: ComponentFixture<MainMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ MainMenuComponent ],
        }).compileComponents();

        fixture = TestBed.createComponent(MainMenuComponent);
    });

    it('Should create component', () => {
        const instance = fixture.componentInstance;
        expect(instance).toBeTruthy();
    });
});