import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UiWebSelectComponent } from './ui-web-select.component';

describe('UiWebSelectComponent', () => {
  let component: UiWebSelectComponent;
  let fixture: ComponentFixture<UiWebSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiWebSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWebSelectComponent);
    component = fixture.componentInstance;
  });

  it('should render select with name prop from `config.name`', () => {
    component.name = 'my-name';

    fixture.detectChanges();

    const selectElem = getSelectElem();

    expect(selectElem).toBeTruthy();
    expect(selectElem.properties['name']).toBe('my-name');
  });

  it('should render select with value prop from `config.value`', () => {
    component.value = 'my value';

    fixture.detectChanges();

    expect(getSelectElem().properties['value']).toBe('my value');
  });

  it('should render select with multiple prop from `config.multiple`', () => {
    component.multiple = true;

    fixture.detectChanges();

    expect(getSelectElem().properties['multiple']).toBe(true);
  });

  it('should render select with size prop from `config.size`', () => {
    component.size = 2;

    fixture.detectChanges();

    expect(getSelectElem().properties['size']).toBe(2);
  });

  it('should render select with required prop from `config.required`', () => {
    component.required = true;

    fixture.detectChanges();

    expect(getSelectElem().properties['required']).toBe(true);
  });

  it('should render select with disabled prop from `config.disabled`', () => {
    component.disabled = true;

    fixture.detectChanges();

    expect(getSelectElem().properties['disabled']).toBe(true);
  });

  it('should render select with tabIndex prop from `config.tabindex`', () => {
    component.tabIndex = 1;

    fixture.detectChanges();

    expect(getSelectElem().properties['tabIndex']).toBe(1);
  });

  it('should render select with autofocus prop from `config.autofocus`', () => {
    component.autofocus = true;

    fixture.detectChanges();

    expect(getSelectElem().properties['autofocus']).toBe(true);
  });

  describe('options as strings', () => {
    it('should be rendered with value and text', () => {
      component.options = ['opt1', 'opt2', 'opt3'];

      fixture.detectChanges();

      const options = getSelectElem().queryAll(By.css('option'));

      expect(options.length).toBe(3);
      expect(options[0].properties['value']).toBe('opt1');
      expect(options[0].nativeElement.textContent).toMatch('opt1');
      expect(options[1].properties['value']).toBe('opt2');
      expect(options[1].nativeElement.textContent).toMatch('opt2');
      expect(options[2].properties['value']).toBe('opt3');
      expect(options[2].nativeElement.textContent).toMatch('opt3');
    });
  });

  describe('options as pairs', () => {
    it('should be rendered with `option.value` and `option.label`', () => {
      component.options = [
        { label: 'Opt #1', value: 1 },
        { label: 'Opt #2', value: 2 },
        { label: 'Opt #3', value: 3 },
      ];

      fixture.detectChanges();

      const options = getSelectElem().queryAll(By.css('option'));

      expect(options.length).toBe(3);
      expect(options[0].properties['value']).toBe(1);
      expect(options[0].nativeElement.textContent).toMatch('Opt #1');
      expect(options[1].properties['value']).toBe(2);
      expect(options[1].nativeElement.textContent).toMatch('Opt #2');
      expect(options[2].properties['value']).toBe(3);
      expect(options[2].nativeElement.textContent).toMatch('Opt #3');
    });

    it('should set selected from `option.selected`', () => {
      component.options = [
        { label: 'Opt #1', value: 1 },
        { label: 'Opt #2', value: 2, selected: true },
        { label: 'Opt #3', value: 3 },
      ];

      fixture.detectChanges();

      const options = getSelectElem().queryAll(By.css('option'));

      expect(options.length).toBe(3);
      expect(options[0].properties['selected']).toBeFalsy();
      expect(options[1].properties['selected']).toBeTruthy();
      expect(options[2].properties['selected']).toBeFalsy();
    });

    it('should set disabled from `option.disabled`', () => {
      component.options = [
        { label: 'Opt #1', value: 1 },
        { label: 'Opt #2', value: 2 },
        { label: 'Opt #3', value: 3, disabled: true },
      ];

      fixture.detectChanges();

      const options = getSelectElem().queryAll(By.css('option'));

      expect(options.length).toBe(3);
      expect(options[0].properties['disabled']).toBeFalsy();
      expect(options[1].properties['disabled']).toBeFalsy();
      expect(options[2].properties['disabled']).toBeTruthy();
    });
  });

  describe('options with groups', () => {
    it('should render optgroup with label prop `option.label`', () => {
      component.options = [
        { label: 'Group 1', children: [] },
        { label: 'Group 2', children: [] },
        { label: 'Group 3', children: [] },
      ];

      fixture.detectChanges();

      const groupsElem = getSelectElem().queryAll(By.css('optgroup'));

      expect(groupsElem.length).toBe(3);
      expect(groupsElem[0].properties['label']).toBe('Group 1');
      expect(groupsElem[1].properties['label']).toBe('Group 2');
      expect(groupsElem[2].properties['label']).toBe('Group 3');
    });

    it('should render optgroup with disabled prop `option.disabled`', () => {
      component.options = [
        { disabled: true, children: [] },
        { disabled: false, children: [] },
        { children: [] },
      ];

      fixture.detectChanges();

      const groupsElem = getSelectElem().queryAll(By.css('optgroup'));

      expect(groupsElem.length).toBe(3);
      expect(groupsElem[0].properties['disabled']).toBeTruthy();
      expect(groupsElem[1].properties['disabled']).toBeFalsy();
      expect(groupsElem[2].properties['disabled']).toBeFalsy();
    });

    it('should render options as strings inside', () => {
      component.options = [
        { label: 'Group 1', children: ['opt1', 'opt2'] },
        { label: 'Group 2', children: ['opt3'] },
      ];

      fixture.detectChanges();

      const groupsElem = getSelectElem().queryAll(By.css('optgroup'));

      expect(groupsElem.length).toBe(2);

      const [group1, group2] = groupsElem.map(group => group.queryAll(By.css('option')));

      expect(group1).toBeTruthy();
      expect(group1.length).toBe(2);
      expect(group1[0].nativeElement.textContent).toMatch('opt1');
      expect(group1[1].nativeElement.textContent).toMatch('opt2');

      expect(group2.length).toBe(1);
      expect(group2[0].nativeElement.textContent).toMatch('opt3');
    });

    it('should render options as pairs inside', () => {
      component.options = [
        {
          label: 'Group 1',
          children: [{ label: 'Opt 1', value: 1 }, { label: 'Opt 2', value: 2 }],
        },
        { label: 'Group 2', children: [{ label: 'Opt 3', value: 3 }] },
      ];

      fixture.detectChanges();

      const groupsElem = getSelectElem().queryAll(By.css('optgroup'));

      expect(groupsElem.length).toBe(2);

      const [group1, group2] = groupsElem.map(group => group.queryAll(By.css('option')));

      expect(group1.length).toBe(2);
      expect(group1[0].properties['value']).toBe(1);
      expect(group1[0].nativeElement.textContent).toMatch('Opt 1');
      expect(group1[1].properties['value']).toBe(2);
      expect(group1[1].nativeElement.textContent).toMatch('Opt 2');

      expect(group2.length).toBe(1);
      expect(group2[0].properties['value']).toBe(3);
      expect(group2[0].nativeElement.textContent).toMatch('Opt 3');
    });

    it('should NOT render deeper groups', () => {
      component.options = [
        {
          label: 'Group 1',
          children: ['opt1', { label: 'Group 2', children: ['opt2'] } as any],
        },
      ];

      fixture.detectChanges();

      const groupsElem = getSelectElem().queryAll(By.css('optgroup'));

      expect(groupsElem.length).toBe(1);
    });
  });

  function getSelectElem() {
    return fixture.debugElement.query(By.css('select'));
  }
});
