import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookFormModal from '../BookFormModal';

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();

describe('BookFormModal', () => {
  it('should render the form for adding a new book', () => {
    render(<BookFormModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);
    expect(screen.getByText('Add New Book')).toBeInTheDocument();
    expect(screen.getByLabelText('ISBN')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Author')).toBeInTheDocument();
    expect(screen.getByLabelText('Price ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
  });

  it('should render the form for editing a book', () => {
    const bookToEdit = {
      isbn: '123',
      title: 'Test Book',
      author: 'Test Author',
      price: 10,
      quantity: 5,
    };
    render(<BookFormModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} bookToEdit={bookToEdit} />);
    expect(screen.getByText('Edit Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Author')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('should allow form fields to be filled', () => {
    render(<BookFormModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);
    
    fireEvent.change(screen.getByLabelText('ISBN'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'New Author' } });
    fireEvent.change(screen.getByLabelText('Price ($)'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '15' } });

    expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
    expect(screen.getByDisplayValue('New Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('New Author')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
    expect(screen.getByDisplayValue('15')).toBeInTheDocument();
  });

  it('should call onSave with the form data when submitted', () => {
    render(<BookFormModal isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />);
    
    fireEvent.change(screen.getByLabelText('ISBN'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'New Author' } });
    fireEvent.change(screen.getByLabelText('Price ($)'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '15' } });

    fireEvent.click(screen.getByText('Add Book'));

    expect(mockOnSave).toHaveBeenCalledWith({
      isbn: '12345',
      title: 'New Book',
      author: 'New Author',
      price: '25',
      quantity: '15',
    });
  });
});
