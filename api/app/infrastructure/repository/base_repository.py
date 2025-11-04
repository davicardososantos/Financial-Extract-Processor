from typing import Generic, TypeVar, List, Optional
from uuid import UUID
from sqlalchemy.orm import Session
from datetime import datetime

T = TypeVar('T')  # Tipo genérico para ORM
E = TypeVar('E')  # Tipo genérico para Entity

class BaseRepository(Generic[T, E]):
    def __init__(self, db: Session, model_class: type[T]):
        self.db = db
        self.model_class = model_class
    
    def obter_por_id(self, id: UUID) -> Optional[E]:
        model = self.db.query(self.model_class).filter(self.model_class.id == id).first()
        return self._to_entity(model) if model else None
    
    def listar_todos(self) -> List[E]:
        models = self.db.query(self.model_class).all()
        return [self._to_entity(model) for model in models]
    
    def criar(self, entity: E) -> E:
        """Cria uma nova entidade (INSERT)"""
        model = self._to_model(entity)
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)
    
    def atualizar(self, entity: E) -> E:
        """Atualiza uma entidade existente (UPDATE)"""
        # Busca o modelo existente no banco
        existing_model = self.db.query(self.model_class).filter(
            self.model_class.id == entity.id
        ).first()
        
        if not existing_model:
            raise ValueError(f"{self.model_class.__name__} com ID {entity.id} não encontrado")
        
        # Converte a entity para dict e atualiza o modelo
        update_data = self._entity_to_dict(entity)
        for key, value in update_data.items():
            if hasattr(existing_model, key) and key != 'id':  # Não atualiza o ID
                setattr(existing_model, key, value)
        
        # Atualiza automaticamente o campo alterado_em se existir
        if hasattr(existing_model, 'alterado_em'):
            existing_model.alterado_em = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(existing_model)
        return self._to_entity(existing_model)
    
    def salvar(self, entity: E) -> E:
        """Salva a entidade (CREATE ou UPDATE automático)"""
        if entity.id:
            existing = self.obter_por_id(entity.id)
            if existing:
                return self.atualizar(entity)
        return self.criar(entity)
    
    def excluir(self, id: UUID) -> bool:
        """Exclui uma entidade (soft delete se tiver deletado_em)"""
        model = self.db.query(self.model_class).filter(self.model_class.id == id).first()
        if not model:
            return False
        
        # Soft delete se tiver o campo
        if hasattr(model, 'deletado_em'):
            model.deletado_em = datetime.utcnow()
            self.db.commit()
            return True
        else:
            # Hard delete
            self.db.delete(model)
            self.db.commit()
            return True
    
    def _entity_to_dict(self, entity: E) -> dict:
        """Converte entity para dict (pode ser sobrescrito se necessário)"""
        return {
            key: value 
            for key, value in entity.__dict__.items() 
            if not key.startswith('_')
        }
    
    def _to_entity(self, model: T) -> E:
        """Método ABSTRATO - deve ser implementado por cada repository"""
        raise NotImplementedError("Método _to_entity deve ser implementado")
    
    def _to_model(self, entity: E) -> T:
        """Método ABSTRATO - deve ser implementado por cada repository"""
        raise NotImplementedError("Método _to_model deve ser implementado")